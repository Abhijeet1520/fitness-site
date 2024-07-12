from django.urls import path
from base.views import course_views as views

# Remember the getter methods need the user to be subscribed to the course to which it belongs
urlpatterns = [
    path('create/', views.CourseCreateView.as_view(), name='course-create'),
    path('delete/<int:pk>/', views.CourseDeleteView.as_view(), name='course-delete'),
    path('list/', views.CourseListView.as_view(), name='course-list'),
    path('subscribed/', views.UserSubscribedCoursesView.as_view(), name='user-subscribed-courses'),
    path('detail/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('update/<int:pk>/', views.CourseUpdateView.as_view(), name='course-update'),
    path('detail-with-subscriptions/<int:pk>/', views.CourseDetailWithSubscriptionsView.as_view(), name='course-detail-subscriptions'),
]
