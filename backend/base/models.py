from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH
# Create your models here.

class Course(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)
    images = models.TextField(null=True, blank=True)  # Storing URLs as comma-separated string
    description = models.TextField(null=True,blank=True)
    price = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name +" | "  + str(self.price)

class CourseDetail(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    image_url = models.TextField(null=True, blank=True)  # Assuming the URL is a valid URL
    question = models.TextField(null=True, blank=True)
    detail = models.TextField(null=True, blank=True)
    detail_num = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.course.name} - Detail {self.detail_num}"

class Week(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    week_number = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Week {self.week_number} - {self.course.name}"


class Day(models.Model):
    day_number= models.IntegerField(null=True, blank=True)
    image_url = models.TextField(null=True, blank=True)
    day_name = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    week = models.ForeignKey(Week, on_delete=models.CASCADE)

    def __str__(self):
        return f"Day {self.day_number} - Week {self.week.week_number} - Course {self.week.course.name}"

class Exercise(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    exercise_number= models.IntegerField(null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True) # Warmup | Exercise | Stretching
    sets = models.IntegerField(null=True,blank=True,default=0)
    reps = models.IntegerField(null=True,blank=True,default=0)
    duration = models.DurationField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    video_url = models.TextField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - Week {self.week.week_number} - Day {self.day.day_number} - Course {self.week.course.name}"

# So each payment is related to a single order model.
class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    payment_intent_id = models.CharField(max_length=255, null=True)  # Store Stripe Payment Intent ID
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    currency = models.CharField(max_length=10, null=True)
    status = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Course {self.course.name}"

# When a payment is successfuly created
class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} subscribed to {self.course.name}"
