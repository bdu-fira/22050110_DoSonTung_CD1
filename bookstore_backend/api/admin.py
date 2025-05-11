from django.contrib import admin
from sympy import Order
from .models import account, user, category, book, statusOrder, order, bookDetail, payment

# Register your models here.
admin.site.register(account)
admin.site.register(user)
admin.site.register(category)
admin.site.register(book)
admin.site.register(statusOrder)
admin.site.register(order)
admin.site.register(bookDetail)
admin.site.register(payment)