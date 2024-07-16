from django.urls import path
from base.views import exercise_views as views

# Remember the getter methods need the user to be subscribed to the course to which it belongs
urlpatterns = [
    path('<int:day_id>/exercises/', views.ExerciseListAPIView.as_view(), name='exercise-list'),
    path('exercises/create/', views.ExerciseCreateAPIView.as_view(), name='exercise-create'),
    path('exercises/<int:exercise_id>/', views.ExerciseRetrieveAPIView.as_view(), name='exercise-retrieve'),
    path('exercises/<int:exercise_id>/update/', views.ExerciseUpdateAPIView.as_view(), name='exercise-update'),
    path('exercises/<int:exercise_id>/delete/', views.ExerciseDestroyAPIView.as_view(), name='exercise-delete'),
]
