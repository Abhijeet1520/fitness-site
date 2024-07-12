from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
# Register your models here.
admin.site.register(Course)
admin.site.register(Subscription)
admin.site.register(Payment)
admin.site.register(Exercise)
admin.site.register(Day)
admin.site.register(Week)
