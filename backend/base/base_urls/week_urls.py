from django.urls import path
from base.views import week_views as views

# Remember the getter methods need the user to be subscribed to the course to which it belongs
urlpatterns = [
    path('<int:course_id>/weeks/', views.WeekListAPIView.as_view(), name='week-list'),
    path('weeks/create/', views.WeekCreateAPIView.as_view(), name='week-create'),
    path('weeks/<int:week_id>/', views.WeekRetrieveAPIView.as_view(), name='week-retrieve'),
    path('weeks/<int:week_id>/update/', views.WeekUpdateAPIView.as_view(), name='week-update'),
    path('weeks/<int:week_id>/delete/', views.WeekDestroyAPIView.as_view(), name='week-delete'),
]

