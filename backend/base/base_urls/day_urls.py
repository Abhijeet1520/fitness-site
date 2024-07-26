from django.urls import path
from base.views import day_views as views

# Remember the getter methods need the user to be subscribed to the course to which it belongs
urlpatterns = [
    path('<int:week_id>/days/', views.DayListAPIView.as_view(), name='day-list'),
    path('days/all', views.DayListALLAPIView.as_view(), name='day-list-all'),
    path('days/create/', views.DayCreateAPIView.as_view(), name='day-create'),
    path('days/<int:day_id>/', views.DayRetrieveAPIView.as_view(), name='day-retrieve'),
    path('days/<int:day_id>/update/', views.DayUpdateAPIView.as_view(), name='day-update'),
    path('days/<int:day_id>/delete/', views.DayDestroyAPIView.as_view(), name='day-delete'),
]
