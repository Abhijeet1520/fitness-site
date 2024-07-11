from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
# Register your models here.
admin.site.register(Course)
admin.site.register(Review)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Subscription)
admin.site.register(Payment)
admin.site.register(Exercise)
admin.site.register(Day)
admin.site.register(Week)

# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = [
#         "user","createdAt","totalPrice"
#     ]