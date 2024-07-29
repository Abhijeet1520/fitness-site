from rest_framework import generics, permissions
from base.models import CourseDetail
from base.serializers import CourseDetailSerializer

# Create CourseDetail
class CourseDetailCreateView(generics.CreateAPIView):
    queryset = CourseDetail.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAdminUser]

# Delete CourseDetail
class CourseDetailDeleteView(generics.DestroyAPIView):
    queryset = CourseDetail.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAdminUser]

# List All CourseDetails
class CourseDetailListView(generics.ListAPIView):
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        course_id = self.kwargs['pk']
        return CourseDetail.objects.filter(course_id=course_id)

# Retrieve CourseDetail
class CourseDetailRetrieveView(generics.RetrieveAPIView):
    queryset = CourseDetail.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.AllowAny]

# Update CourseDetail
class CourseDetailUpdateView(generics.UpdateAPIView):
    queryset = CourseDetail.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAdminUser]
