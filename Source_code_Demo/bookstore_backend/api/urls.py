# api/urls.py (hoặc app nào chứa views)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AccountViewSet, BookViewSet, BookDetailViewSet, CategoryViewSet,
    OrderViewSet, PaymentViewSet, StatusOrderViewSet, UserViewSet,
    PasswordResetView, EmployeeViewSet, LoginView, RegisterView
)

router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='accounts')
router.register(r'books', BookViewSet, basename='books')
router.register(r'books_detail', BookDetailViewSet, basename='books detail')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'payment', PaymentViewSet, basename='payment')
router.register(r'status_order', StatusOrderViewSet, basename='status order')
router.register(r'users', UserViewSet, basename='users')
router.register(r'employees', EmployeeViewSet, basename='employees')
# router.register(r'password_reset', PasswordResetView, basename='password_reset')

urlpatterns = [
    path('', include(router.urls)),
    path('password-reset/', PasswordResetView.as_view(), name='password reset'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]
