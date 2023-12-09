from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=120)
    logo = models.ImageField(upload_to='logo/')


class Department(models.Model):
    company = models.ForeignKey(
        User,
        related_name='departments',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=120)
    head_name = models.CharField(max_length=120)
    head_contact = models.CharField(max_length=120)
    description = models.TextField(max_length=2000)


class Employee(models.Model):
    department = models.ForeignKey(
        Department,
        related_name='employees',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=120)
    probability = models.FloatField()
