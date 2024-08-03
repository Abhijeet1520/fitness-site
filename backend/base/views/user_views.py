from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import User
from base.serializers import UserSerializer
from rest_framework.response import Response

# Create a normal User
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Ensure that first_name and last_name are saved during user creation
        user = serializer.save(first_name=self.request.data.get('first_name', ''),
                               last_name=self.request.data.get('last_name', ''))
        user.save()

# Create an admin user, only an admin can create another admin user
class AdminUserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes =
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        user = serializer.save(is_staff=True, first_name=self.request.data.get('first_name', ''),
                               last_name=self.request.data.get('last_name', ''))
        user.save()

# Can only access data that belongs to itself not other users
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the user instance of the currently authenticated user
        return self.request.user

# Update Current User
class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve the user object based on the logged-in user or admin's request
        if self.request.user.is_staff or self.request.user.is_superuser:
            # Admin can update any user
            return User.objects.get(id=self.kwargs['pk'])
        else:
            # Regular users can only update their own profile
            return self.request.user

    def put(self, request, *args, **kwargs):
        # Ensure that the user being updated is the same as the requester's user or admin's request
        user_obj = self.get_object()
        serializer = self.get_serializer(user_obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        
        self.perform_update(serializer)
        
        return Response(serializer.data)

# Delete User
class UserDeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        if self.request.user.is_staff or self.request.user.is_superuser:
            # Admin can delete any user specified by ID
            return User.objects.get(id=self.kwargs['pk'])
        else:
            # Regular users can only delete their own account
            return self.request.user
