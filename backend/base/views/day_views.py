from rest_framework import generics, permissions
from base.models import Day
from base.serializers import DaySerializer

class DayCreateAPIView(generics.CreateAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAdminUser]


class DayListAPIView(generics.ListAPIView):
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        week_id = self.kwargs['week_id']
        return Day.objects.filter(week_id=week_id)


class DayRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'day_id'


class DayUpdateAPIView(generics.UpdateAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_url_kwarg = 'day_id'

class DayDestroyAPIView(generics.DestroyAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_url_kwarg = 'day_id'