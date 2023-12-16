from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import (CustomUserViewSet, DepartmentViewSet, EmployeeViewSet,
                       FileEmployeesView, FileMessagesView)


app_name = 'api'

v1_router = DefaultRouter()
v1_router.register(r'departments', DepartmentViewSet, basename='departments')
v1_router.register(r'employees', EmployeeViewSet, basename='employees')
v1_router.register(r'auth/users', CustomUserViewSet, basename='users')

urlpatterns = [
    # path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('file_employees/', FileEmployeesView.as_view(), name='file-employee'),
    path('file_messages/', FileMessagesView.as_view(), name='file-message'),
    path('', include(v1_router.urls)),
]
