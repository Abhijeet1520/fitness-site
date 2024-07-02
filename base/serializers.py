from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name= serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User 
        fields = ['id','_id','username','email','name','isAdmin']

    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_name(self,obj):
        name = obj.first_name
        if name=="":
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token= serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =User
        fields = ['id','_id','username','email','name','isAdmin','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = '__all__'

# class ProductSerializer(serializers.ModelSerializer):
#     reviews = serializers.SerializerMethodField(read_only= True)
#     class Meta:
#         model = Product 
#         fields = '__all__'

#     def get_reviews(self,obj):
#         reviews = obj.review_set.all()
#         serializer = ReviewSerializer(reviews,many=True)
#         return serializer.data

# class ShippingAddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ShippingAddress
#         fields = '__all__'

# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = '__all__'

# class OrderSerializer(serializers.ModelSerializer):
#     orderItems = serializers.SerializerMethodField(read_only=True)
#     shippingAddress = serializers.SerializerMethodField(read_only=True)
#     User = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Order
#         fields = '__all__'

#     def get_orderItems(self,obj):
#         items = obj.orderitem_set.all()
#         serializer = OrderItemSerializer(items,many=True)
#         return serializer.data

#     def get_shippingAddress(self,obj):
#         try:
#             address = ShippingAddressSerializer(obj.shippingaddress,many=False).data
#         except:
#             address = False
#         return address

#     def get_User(self,obj):
#         items = obj.user
#         serializer = UserSerializer(items,many=False)
#         return serializer.data


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=['id', 'user', 'name', 'image', 'description', 'rating', 'numReviews', 'price', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields=['id', 'user', 'course', 'rating', 'comment', 'created_at']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=['id', 'user', 'shipping_address', 'created_at', 'payment']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields=['id', 'order', 'course', 'price', 'image', 'created_at']


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields=['id', 'user', 'created_at']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartItem
        fields=['id', 'cart', 'course', 'created_at']


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields=['id', 'user', 'address', 'city', 'state', 'postalCode', 'country', 'created_at']



class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model=Week
        fields=['id', 'course', 'week_number', 'created_at']


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model=Day
        fields=['id', 'description', 'week']


class ExerciseSerializer(serializers.Serializer):
    class Meta:
        model=Exercise
        fields=['id', 'week', 'day', 'title', 'type', 'sets', 'reps', 'duration', 'description', 'video_url', 'created_at']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields=['id', 'user', 'order', 'payment_method', 'tax_price', 'shipping_price', 'total_price', 'is_paid', 'paid_at', 'created_at']