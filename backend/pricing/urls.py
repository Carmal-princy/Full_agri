from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # ✅ Home route to prevent 404
    path('upload/', views.upload_dataset, name='upload'),
    path('predict/', views.predict_price, name='predict'),
]
