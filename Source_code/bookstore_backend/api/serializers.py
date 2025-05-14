from rest_framework import serializers
from .models import account, book, bookDetail, category, order, payment, statusOrder, user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = '__all__'
        read_only_fields = ('userID', 'role')

class AccountSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = account
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category.categoryName', read_only=True)

    class Meta:
        model = book
        fields = ['bookID',
            'bookName',
            'price',
            'quantity',
            'author',
            'descrip',
            'coverImage',
            'categoriesID',  # Foreign key (ID)
            'categoryName',  # Tên thể loại'
        ]
        
class BookDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = bookDetail
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = order
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = payment
        fields = '__all__'

class StatusOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = statusOrder
        fields = '__all__'

