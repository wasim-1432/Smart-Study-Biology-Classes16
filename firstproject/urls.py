from django.contrib import admin
from django.urls import path
from testapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.testpaper, name='home'),      # 👈 Added (fix for Render homepage)
    path('testpaper/', views.testpaper, name='testpaper'),
]