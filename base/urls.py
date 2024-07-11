# base/urls.py
from django.urls import path, include

urlpatterns = [
    path('user/', include('base.base_urls.user_urls')),
    path('course/', include('base.base_urls.course_urls')),
    # add other view modules as needed
]
