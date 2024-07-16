from rest_framework import generics, permissions
from base.models import Exercise
from base.serializers import ExerciseSerializer
from base import custom_permissions

class ExerciseCreateAPIView(generics.CreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAdminUser]


class ExerciseListAPIView(generics.ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated, custom_permissions.IsUserSubscribedToThisCourse_Day]

    def get_queryset(self):
        day_id = self.kwargs['day_id']
        return Exercise.objects.filter(day_id=day_id)


class ExerciseRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated, custom_permissions.IsUserSubscribedToThisCourse_Exercise]
    lookup_url_kwarg = 'exercise_id'

class ExerciseUpdateAPIView(generics.UpdateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_url_kwarg = 'exercise_id'

class ExerciseDestroyAPIView(generics.DestroyAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_url_kwarg = 'exercise_id'
