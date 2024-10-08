from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import *


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'images', 'description', 'price','created_at']


class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDetail
        fields = ['id', 'course', 'image_url', 'question', 'detail', 'detail_num']
        
class UserSerializer(serializers.ModelSerializer):
    courses_subscribed = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'courses_subscribed', 'password']
        extra_kwargs={"password": {"write_only": True}, "is_staff": {"read_only": True},
                      'courses_subscribed': {'read_only': True}}
    
    def get_courses_subscribed(self, obj):
        # Get courses where the user is the owner
        subscriptions = Subscription.objects.filter(user=obj)
        # Extract courses from subscriptions
        courses = [subscription.course for subscription in subscriptions]

        return CourseSerializer(courses, many=True).data
    
    def create(self, validated_data):
        # Override the create method to handle password hashing
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        # Override the update method to handle password hashing
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    

class SubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Use UserSerializer for detailed user information
    course = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'course', 'subscribed_at']

    def get_course(self, obj):
        return {
            'id':  obj.course.id,
            'name': obj.course.name,
            'price': obj.course.price
        }


class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = '__all__'



class DaySerializer(serializers.ModelSerializer):
    num_exercises = serializers.SerializerMethodField()

    class Meta:
        model = Day
        fields = ['id', 'week', 'day_number', 'day_name', 'description', 'num_exercises', 'image_url']
    
    def get_num_exercises(self, obj):
        return Exercise.objects.filter(day_id=obj.id).count()


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Payment
        fields = ['id', 'user', 'course', 'payment_intent_id', 'amount', 'currency', 'status', 'created_at']
        extra_kwargs = {'user': {'read_only': True}}

    def get_course(self, obj):
        return {
            'id':  obj.course.id,
            'name': obj.course.name,
            'price': obj.course.price
        }