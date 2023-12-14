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
from django.views import View
import csv
from django.http import HttpResponse
from utils.recalculate import recalculate


class FileEmployeesView(View):
    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            'attachment; filename="employees.csv"'
        )

        writer = csv.writer(response)
        writer.writerow([
            'name',
            'mail',
            'age',
            'education_level',
            'education_field',
            'is_male',
            'is_married',
            'is_child',
            'is_house',
            'salary',
            'role',
            'total_working_years',
            'years_at_company',
            'work_hours_week',
            'work_accident',
            'change_salary_period',
            'department',
        ])
        data_rows = Employee.objects.values_list(
            'name',
            'mail',
            'age',
            'education_level',
            'education_field',
            'is_male',
            'is_married',
            'is_child',
            'is_house',
            'salary',
            'role',
            'total_working_years',
            'years_at_company',
            'work_hours_week',
            'work_accident',
            'change_salary_period',
            'department__name',
        )
        for row in data_rows:
            writer.writerow(row)

        return response

    def post(self, request, *args, **kwargs):
        csv_file = request.FILES['csv_file']
        reader = csv.reader(csv_file.decode('utf-8').splitlines())
        for row in reader:
            probability = 0
            department = Department.objects.filter(name=row[16])
            Employee.objects.create(
                department=department,
                name=row[0],
                mail=row[1],
                probability=probability,
                age=row[2],
                education_level=row[3],
                education_field=row[4],
                is_male=row[5],
                is_married=row[6],
                is_child=row[7],
                is_house=row[8],
                salary=row[9],
                role=row[10],
                total_working_years=row[11],
                years_at_company=row[12],
                work_hours_week=row[13],
                work_accident=row[14],
                change_salary_period=row[15],
            )
        # recalculate()
        return Response(status=status.HTTP_200_OK)


class FileMessagesView(View):
    def get(self, request, *args, **kwargs):
        file_path = '/app/media/docs/messages.csv'
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='text/csv')
            response['Content-Disposition'] = (
                'attachment; filename="messages.csv"'
            )
            return response

    def post(self, request, *args, **kwargs):
        existing_file_path = '/app/media/docs/messages.csv'
        with open(existing_file_path, 'r', encoding='utf-8') as existing_file:
            existing_data = set(existing_file.read().splitlines())
        csv_file = request.FILES['csv_file']
        csv_data = set(csv_file.read().decode('utf-8').splitlines())
        csv_data_without_duplicates = csv_data.difference(existing_data)
        merged_data = existing_data.union(csv_data_without_duplicates)
        with open(existing_file_path, 'w', encoding='utf-8') as merged_file:
            merged_file.write('\n'.join(merged_data))
        # recalculate()


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        user = self.request.user
        departments = user.departments.all()
        queryset = []
        for department in departments:
            queryset.extend(department.employees.all())
        return queryset

    def perform_create(self, serializer):
        probability = 0
        serializer.save(probability=probability)


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
