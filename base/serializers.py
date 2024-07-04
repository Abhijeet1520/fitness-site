from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']


    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name


# class UserSerializerWithToken(UserSerializer):
#     token = serializers.SerializerMethodField(read_only=True)
    
#     class Meta:
#         model = User
#         fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

#     def get_token(self, obj):
#         token = RefreshToken.for_user(obj)
#         return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

    def get_user(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name


class CourseSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True, source='review_set')

    class Meta:
        model = Course
        fields = ['id', 'user', 'name', 'image', 'description', 'rating', 'numReviews', 'price', 'reviews', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')
    shippingAddress = ShippingAddressSerializer(many=False, read_only=True, source='shipping_address')
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'shippingAddress', 'created_at', 'payment', 'orderItems']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    cartItems = CartItemSerializer(many=True, read_only=True, source='cartitem_set')
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'cartItems']


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
