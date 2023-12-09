from api.models import Company, Department, Employee
from rest_framework import serializers
from djoser.serializers import UserSerializer

from api.models import User


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class UserCustomSerializer(UserSerializer):
    company = CompanySerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'company', 'first_name', 'last_name']