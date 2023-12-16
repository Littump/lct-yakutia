from django.contrib import admin
from api.models import (User, Department, Employee)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    ...


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    ...


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    ...
