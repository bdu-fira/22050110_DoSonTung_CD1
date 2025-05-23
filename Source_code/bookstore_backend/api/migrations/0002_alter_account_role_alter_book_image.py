# Generated by Django 5.0.7 on 2025-05-01 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='Role',
            field=models.CharField(choices=[('admin', 'Admin'), ('employee', 'Employee'), ('user', 'User')], default='user', max_length=20),
        ),
        migrations.AlterField(
            model_name='book',
            name='Image',
            field=models.ImageField(blank=True, null=True, upload_to='book_images/'),
        ),
    ]
