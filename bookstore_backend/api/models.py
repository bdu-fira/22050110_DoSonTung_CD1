from django.db import models

class account(models.Model):
    role_choices = [
        ('admin', 'Admin'),
        ('employee', 'Employee'),
        ('user', 'User'),
    ]

    accountID = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(
        max_length=20,
        choices=role_choices,
        default='user',
    )

    def __str__(self):
        return self.userName


class user(models.Model):
    userID = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=20)
    email = models.EmailField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    accountID = models.ForeignKey(account, on_delete=models.CASCADE)

    def __str__(self):
        return self.userName


class category(models.Model):
    categoriesID = models.AutoField(primary_key=True)
    categoryName = models.CharField(max_length=100)

    def __str__(self):
        return self.categoryName


class book(models.Model):
    bookID = models.AutoField(primary_key=True)
    bookName = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    quantity = models.IntegerField(default=0)
    author = models.CharField(max_length=100, null=True, blank=True)
    descrip = models.TextField(null=True, blank=True)
    coverImage = models.ImageField(upload_to='book_images/', null=True, blank=True)
    categoriesID = models.ForeignKey(category, on_delete=models.CASCADE)

    def __str__(self):
        return self.bookName


class statusOrder(models.Model):
    statusOrderID = models.AutoField(primary_key=True)
    statusName = models.CharField(max_length=100)

    def __str__(self):
        return self.statusName


class order(models.Model):
    orderID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(user, on_delete=models.CASCADE)
    dateOrderPlace = models.DateTimeField(auto_now_add=True)
    statusOrderID = models.ForeignKey(statusOrder, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Order {self.orderID}"


class bookDetail(models.Model):
    bookDetailID = models.AutoField(primary_key=True)
    orderID = models.ForeignKey(order, on_delete=models.CASCADE)
    bookID = models.ForeignKey(book, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"BookDetail {self.bookDetailID}"


class payment(models.Model):
    paymentID = models.AutoField(primary_key=True)
    orderID = models.ForeignKey(order, on_delete=models.CASCADE)
    paymentMethod = models.CharField(max_length=50)
    statusOrderID = models.ForeignKey(statusOrder, on_delete=models.CASCADE)
    datePayment = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"Payment {self.paymentID}"