from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Company(models.Model):
    name = models.CharField(max_length=120)
    logo = models.ImageField(upload_to='logo/', blank=True, null=True)
    owner = models.OneToOneField(
        User,
        related_name='company',
        blank=True,
        on_delete=models.PROTECT,
    )


class Department(models.Model):
    company = models.ForeignKey(
        Company,
        related_name='departments',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=120)
    head_name = models.CharField(max_length=120)
    head_contact = models.CharField(max_length=120)
    description = models.TextField(max_length=2000)


class Employee(models.Model):
    department = models.ForeignKey(
        Company,
        related_name='employees',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=120)
    probability = models.FloatField()
