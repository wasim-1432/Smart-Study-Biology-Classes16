from django.urls import path
from . import views

urlpatterns = [
    path('', views.testpaper, name='testpaper'),        # Home of testapp
    path('result/', views.result, name='result'),        # Result page
]