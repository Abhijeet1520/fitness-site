# base/urls.py
from django.urls import path, include

urlpatterns = [
    path('user/', include('base.base_urls.user_urls')),
    # path('course/', include('base.urls.courses_views')),
    # add other view modules as needed
]
