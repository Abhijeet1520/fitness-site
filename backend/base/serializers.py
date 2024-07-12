from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'image', 'description', 'price','created_at']


class UserSerializer(serializers.ModelSerializer):
    courses_subscribed = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'courses_subscribed', 'password']
        extra_kwargs={"password": {"write_only": True}, "is_staff": {"read_only": True}}
    
    def get_courses_subscribed(self, obj):
        # Get courses where the user is the owner
        subscriptions = Subscription.objects.filter(user=obj)
        # Extract courses from subscriptions
        courses = [subscription.course for subscription in subscriptions]

        # Serialize the courses
        return CourseSerializer(courses, many=True).data

        
    def create(self, validated_data):
        # Extract the email and username from the validated data
        email = validated_data.pop('email')
        username = validated_data.pop('username')
        
        # Create the user with the email and username
        user = User.objects.create_user(
            username=username,
            email=email,
            **validated_data
        )
        
        return user

class SubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Use UserSerializer for detailed user information
    course = CourseSerializer(read_only=True)  # Use CourseSerializer for detailed course information

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'course', 'subscribed_at']


class OrderItemSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = ['price', 'course', 'image', 'created_at']

    def get_course(self, obj):
        return obj.name


class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'orderItems']
        extra_kwargs = {'user': {'read_only': True}}


class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = '__all__'


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}

