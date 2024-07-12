from rest_framework import generics, permissions
from rest_framework.response import Response
from base.models import Course, Subscription
from base.serializers import CourseSerializer, UserSerializer


# Create Course (Admin/SuperUser)
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]


# Delete Course (Admin/SuperUser)
class CourseDeleteView(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]


# List All Courses (Anyone)
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

# Get Courses Subscribed by Current User (Authenticated)
class UserSubscribedCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.filter(subscription__user=user)


# Retrieve Course Detail (Anyone)
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]


# Update Course (Admin/SuperUser)
class CourseUpdateView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]



# Retrieve Course Detail with Subscribed Users (Admin/SuperUser)
class CourseDetailWithSubscriptionsView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        #get subscriptions associated with the course
        subscriptions = Subscription.objects.filter(course=instance)
        # subscription_serializer = SubscriptionSerializer(subscriptions, many=True)

        #get a list of users from the subscritpion list
        users = [subscription.user for subscription in subscriptions]
        user_list = [{"id": user.id, "username": user.username, "email": user.email} for user in users]

        data = serializer.data
        data['subscriptions'] = user_list
        return Response(data)