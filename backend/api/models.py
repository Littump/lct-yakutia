from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=120)
    logo = models.ImageField(upload_to='logo/', null=True, blank=True)


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
    probability = models.FloatField(blank=True)

    age = models.PositiveIntegerField()
    EDUCATION_CHOICES = [
        ('0', 'Без образования'),
        ('1', 'Среднее общее'),
        ('2', 'Средне специальное'),
        ('3', 'Высшее'),
    ]
    education_level = models.CharField(
        max_length=1,
        choices=EDUCATION_CHOICES,
        default='0',
    )
    EDUCATION_FIELD_CHOICES = [
        ('gum', 'Гумманитарное'),
        ('tech', 'Техническое'),
        ('chem_bio', 'Химия, биология и производные'),
        ('nat', 'Естественные науки'),
        ('soc', 'Социальное, управленческое'),
        ('eco', 'Экономическое'),
    ]
    education_field = models.CharField(
        max_length=8,
        choices=EDUCATION_FIELD_CHOICES,
        default='gum',
    )
    GENDER_CHOICES = [
        ('m', 'Мужской'),
        ('f', 'Женский'),
    ]
    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        default='m',
    )
    IS_MARRIED_CHOICES = [
        ('0', 'Не в браке'),
        ('1', 'В браке'),
    ]
    is_married = models.CharField(
        max_length=1,
        choices=IS_MARRIED_CHOICES,
        default='0',
    )
    IS_CHILD_CHOICES = [
        ('0', 'Нет'),
        ('1', 'Да'),
    ]
    is_child = models.CharField(
        max_length=1,
        choices=IS_CHILD_CHOICES,
        default='0',
    )
    IS_HOUSE_CHOICES = [
        ('0', 'Нет'),
        ('1', 'Да'),
    ]
    is_house = models.CharField(
        max_length=1,
        choices=IS_HOUSE_CHOICES,
        default='0',
    )
    salary = models.IntegerField()
    ROLE_CHOICES = [
        ('role1', 'Роль 1'),
        ('role2', 'Роль 2'),
    ]
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='role1',
    )
    total_working_years = models.FloatField()
    years_at_company = models.FloatField()
    work_hours_week = models.IntegerField()

    WORK_ACCIDENT_CHOICES = [
        ('1', 'Да'),
        ('0', 'Нет'),
    ]
    work_accident = models.CharField(
        max_length=1,
        choices=WORK_ACCIDENT_CHOICES,
        default='0',
    )
    change_salary_period = models.IntegerField()