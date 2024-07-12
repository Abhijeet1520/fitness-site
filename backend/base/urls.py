# base/urls.py
from django.urls import path, include

urlpatterns = [
    path('user/', include('base.base_urls.user_urls')),
    path('course/', include('base.base_urls.course_urls')),
    path('payment/', include('base.base_urls.payment_urls')),
]
