from django.urls import path
from base.views import course_detail_views as views

urlpatterns = [
    path('create/', views.CourseDetailCreateView.as_view(), name='coursedetail-create'),
    path('delete/<int:pk>/', views.CourseDetailDeleteView.as_view(), name='coursedetail-delete'),
    path('<int:pk>/', views.CourseDetailListView.as_view(), name='coursedetail-list'),
    path('<int:pk>/', views.CourseDetailRetrieveView.as_view(), name='coursedetail-retrieve'),
    path('update/<int:pk>/', views.CourseDetailUpdateView.as_view(), name='coursedetail-update'),
]
