from rest_framework import generics, permissions
from rest_framework.response import Response
from base.models import Week
from base.serializers import WeekSerializer
from base import custom_permissions


class WeekCreateAPIView(generics.CreateAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAdminUser]


class WeekListAPIView(generics.ListAPIView):
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAuthenticated, custom_permissions.IsUserSubscribedToThisCourse_Course]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Week.objects.filter(course_id=course_id)



class WeekRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAuthenticated, custom_permissions.IsUserSubscribedToThisCourse_Week]
    lookup_url_kwarg = 'week_id'


class WeekUpdateAPIView(generics.UpdateAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_url_kwarg = 'week_id'


class WeekDestroyAPIView(generics.DestroyAPIView):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_url_kwarg = 'week_id'