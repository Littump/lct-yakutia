from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class Company(models.Model):
    name = models.CharField(max_length=120)
    logo = models.ImageField(upload_to='logo/')


class User(AbstractUser):
    first_name = models.CharField(_('first name'), max_length=150)
    last_name = models.CharField(_('last name'), max_length=150)
    company = models.OneToOneField(
        Company,
        related_name='owner',
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
