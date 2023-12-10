from api.models import Department, Employee
from api.serializers import (DepartmentSerializer,
                             EmployeeSerializer)
from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def get_queryset(self):
        user = self.request.user
        departments = user.departments.all()
        return departments

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)

    @action(detail=True, methods=['get'])
    def get_employees(self, request, pk=None):
        department = self.get_object()
        employees = department.employees.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
