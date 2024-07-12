# # Django Import 
# from django.shortcuts import render
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password
# from rest_framework import status

# # Rest Framework Import
# from rest_framework.decorators import api_view,permission_classes
# from rest_framework.permissions import IsAuthenticated,IsAdminUser
# from rest_framework.response import Response
# from rest_framework.serializers import Serializer

# # Rest Framework JWT 
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

# # Local Import 
# from base.models import *
# from base.serializers import UserSerializer,UserSerializerWithToken





# # JWT Views
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
       
#         serializer = UserSerializerWithToken(self.user).data

#         for k,v in serializer.items():
#             data[k] =v

#         return data
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         token['message'] = "Hello Proshop"
#         # ...

#         return token

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


# # SHOP API
# @api_view(['GET'])
# def getRoutes(request):
#     routes =[
#         '/api/products/',
#         '/api/products/<id>',
#         '/api/users',
#         '/api/users/register',
#         '/api/users/login',
#         '/api/users/profile',
#     ]
#     return Response(routes)


# @api_view(['POST'])
# def registerUser(request):
#     data = request.data
#     try:
#         user = User.objects.create(
#             first_name = data['name'],
#             username = data['email'],
#             password = make_password(data['password']),
#         )

#         serializer = UserSerializerWithToken(user,many=False)
#         return Response(serializer.data)
    
#     except:
#         message = {"detail":"User with this email is already registered"}
#         return Response(message,status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserProfile(request):
#     user =request.user 
#     serializer = UserSerializer(user,many = False)
#     return Response(serializer.data)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUserProfile(request):
#     user =request.user 
#     serializer = UserSerializerWithToken(user,many = False)
#     data = request.data
#     user.first_name = data['name']
#     user.username = data['email']
#     user.email = data['email']
#     if data['password'] !="":
#         user.password= make_password(data['password'])
#     user.save()
#     return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getUsers(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users,many = True)
#     return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getUserById(request,pk):
#     users = User.objects.get(id=pk)
#     serializer = UserSerializer(users,many = False)
#     return Response(serializer.data)



# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUser(request,pk):
#     user =User.objects.get(id=pk)
   
#     data = request.data
#     user.first_name = data['name']
#     user.username = data['email']
#     user.email = data['email']
#     user.is_staff = data['isAdmin']
    
#     user.save()
#     serializer = UserSerializer(user,many = False)
#     return Response(serializer.data)


# @api_view(['DELETE'])
# @permission_classes([IsAdminUser])
# def deleteUser(request,pk):
#     userForDeletion = User.objects.get(id=pk)
#     userForDeletion.delete()
#     return Response("User was deleted")

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import User
from base.serializers import UserSerializer
from rest_framework.response import Response
#Create a normal User
#TODO: The user created here uses email as the username, don't know why?
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[AllowAny]


#Create a admin user, only an admin can create another admin user
class AdminUserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = 
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        user = serializer.save(is_staff=True)
        user.save()

#Can only access data that belongs to itself not other users
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the user instance of the currently authenticated user
        return self.request.user
    


#Update Current User, You need to pass both username and password to update the user,
#You can update both username and password you give as well.
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
    


class UserDeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated]

    def get_object(self):
        if self.request.user.is_staff or self.request.user.is_superuser:
            # Admin can delete any user specified by ID
            return User.objects.get(id=self.kwargs['pk'])
        else:
            # Regular users can only delete their own account
            return self.request.user
    
