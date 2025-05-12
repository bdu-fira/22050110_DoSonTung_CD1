import random, string 
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status, viewsets
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from django.db import transaction


from .models import account, book, bookDetail, category, order, payment, statusOrder, user
from .serializers import (
    AccountSerializer, BookSerializer, BookDetailSerializer, CategorySerializer,
    OrderSerializer, PaymentSerializer, StatusOrderSerializer, UserSerializer
)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = user.objects.filter(accountID__role='employee')
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def get_employees(self, request):
        """Lấy danh sách nhân viên"""
        employees = self.queryset
        serializer = self.get_serializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_employee(self, request):
        """Thêm nhân viên mới"""
        data = request.data
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')

        # Kiểm tra dữ liệu đầu vào
        if not all([email, name, password]):
            return Response(
                {"error": "Vui lòng cung cấp đầy đủ thông tin."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kiểm tra email trùng lặp
        if user.objects.filter(email=email).exists():
            return Response(
                {"error": "Email đã tồn tại."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Tạo tài khoản và người dùng
        account_instance = account.objects.create(
            userName=email,
            password=make_password(password),
            role="employee"
        )

        user_instance = user.objects.create(
            userName=name,
            email=email,
            accountID=account_instance
        )

        return Response(
            {"message": "Nhân viên đã được thêm thành công."},
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['put'])
    def edit_employee(self, request, pk=None):
        """Chỉnh sửa thông tin nhân viên"""
        try:
            employee = self.get_object()
            data = request.data

            new_email = data.get('email')
            if new_email and user.objects.filter(email=new_email).exclude(pk=employee.pk).exists():
                return Response(
                    {"error": "Email đã tồn tại."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Cập nhật thông tin user
            employee.userName = data.get('name', employee.userName)
            employee.email = new_email or employee.email
            employee.save()

            # Cập nhật tài khoản
            account_instance = employee.accountID
            new_password = data.get('password')
            if new_password:
                account_instance.password = make_password(new_password)
            account_instance.save()

            return Response(
                {"message": "Thông tin nhân viên đã được cập nhật."},
                status=status.HTTP_200_OK
            )
        except user.DoesNotExist:
            return Response(
                {"error": "Nhân viên không tồn tại."},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['delete'])
    def delete_employee(self, request, pk=None):
        """Xóa nhân viên"""
        try:
            employee = self.get_object()
            account_instance = employee.accountID

            # Xóa nhân viên và tài khoản liên quan
            employee.delete()
            account_instance.delete()

            return Response(
                {"message": "Nhân viên đã được xóa thành công."},
                status=status.HTTP_200_OK
            )
        except user.DoesNotExist:
            return Response(
                {"error": "Nhân viên không tồn tại."},
                status=status.HTTP_404_NOT_FOUND
            )

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        identifier = request.data.get('identifier')  # có thể là userName hoặc email
        password = request.data.get('password')

        if not identifier or not password:
            return Response({'error': 'Username or email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Thử tìm theo userName trước
            user_account = account.objects.get(userName=identifier)
        except account.DoesNotExist:
            try:
                # Nếu không có userName, thử tìm user theo email
                user_obj = user.objects.get(email=identifier)
                user_account = user_obj.accountID
            except user.DoesNotExist:
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # So sánh mật khẩu (plain text – KHÔNG AN TOÀN, chỉ dùng cho mục đích demo)
        if user_account.password != password:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Tìm user info từ bảng `user` nếu có
        try:
            user_info = user.objects.get(accountID=user_account)
            user_email = user_info.email
        except user.DoesNotExist:
            user_email = None

        return Response({
            'id': user_account.accountID,
            'userName': user_account.userName,
            'role': user_account.role,
            'email': user_email
        }, status=status.HTTP_200_OK)
    
class RegisterView(APIView):
    def post(self, request):
        userName = request.data.get('userName')
        password = request.data.get('password')
        email = request.data.get('email')
        address = request.data.get('address', '')

        if not userName or not password or not email:
            return Response({'error': 'Vui lòng nhập đầy đủ thông tin!'}, status=status.HTTP_400_BAD_REQUEST)

        if account.objects.filter(userName=userName).exists():
            return Response({'error': 'Tên người dùng đã tồn tại'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.objects.filter(email=email).exists():
            return Response({'error': 'Email đã tồn tại.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                # Tạo tài khoản mới
                new_account = account.objects.create(
                    userName=userName,
                    password=password,
                    role='user'
                )

                # Tạo thông tin người dùng
                new_user = user.objects.create(
                    userName=userName,
                    email=email,
                    address=address,
                    accountID=new_account
                )

                return Response({
                    'message': 'Đăng ký thành công.',
                    'user': {
                        'id': new_account.accountID,
                        'userName': new_account.userName,
                        'role': new_account.role,
                        'email': new_user.email,
                        'address': new_user.address
                    }
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Registration failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = account.objects.all()
    serializer_class = AccountSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        category_name = self.request.query_params.get('category')
        if category_name:
            return self.queryset.filter(categoriesID__categoryName__iexact=category_name)
        return self.queryset

class BookDetailViewSet(viewsets.ModelViewSet):
    queryset = bookDetail.objects.all()
    serializer_class = BookDetailSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = category.objects.all()
    serializer_class = CategorySerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = order.objects.all()
    serializer_class = OrderSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = payment.objects.all()
    serializer_class = PaymentSerializer

class StatusOrderViewSet(viewsets.ModelViewSet):
    queryset = statusOrder.objects.all()
    serializer_class = StatusOrderSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = user.objects.all()
    serializer_class = UserSerializer

# Tạo view cho việc đặt lại mật khẩu
class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {"status": "error", "message": "Email là bắt buộc"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            found_user = user.objects.get(email=email)
        except user.DoesNotExist:
            return Response(
                {"status": "error", "message": "Không tìm thấy tài khoản với email này"},
                status=status.HTTP_404_NOT_FOUND
            )

        account = found_user.accountID  # assuming FK name is accountID
        new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

        old_password = account.password
        account.password = new_password
        account.save()

        subject = 'Mật khẩu mới của bạn'
        message = f'''
Xin chào {found_user.userName or 'bạn'},

Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn.
Tên đăng nhập: {account.username if hasattr(account, 'username') else '---'}
Mật khẩu mới: {new_password}

Vui lòng đăng nhập và thay đổi mật khẩu của bạn ngay sau khi đăng nhập.

Trân trọng,
Electric store
        '''

        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return Response(
                {"status": "ok", "message": "Mật khẩu mới đã được gửi đến email của bạn"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            account.password = old_password
            account.save()
            return Response(
                {"status": "error", "message": f"Lỗi gửi email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )