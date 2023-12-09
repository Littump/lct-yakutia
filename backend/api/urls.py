from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.views import (DepartmentViewSet, EmployeeViewSet)

app_name = 'api'

v1_router = DefaultRouter()
v1_router.register(r'departments', DepartmentViewSet, basename='departments')
v1_router.register(r'employees', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(v1_router.urls)),
]
