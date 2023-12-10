from api.models import Department, Employee
from rest_framework import serializers
from djoser.serializers import UserSerializer, UserCreateSerializer

from api.models import User


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['name', 'head_name', 'head_contact', 'description']


class UserCustomSerializer(UserSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'logo']


class UserCustomCreateSerializer(UserCreateSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'name', 'logo', 'password']