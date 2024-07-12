from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH
# Create your models here.

# TODO: Since we are using S3 I need to change the way we store image here.
class Course(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank = True, default = "/images/placeholder.png", upload_to="images/")
    description = models.TextField(null=True,blank=True)
    price = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name +" | "  + str(self.price)
    
# Understand:
# So basically order can have multiople order items that is if someone wants to buy multiple courses at once
# also I have separated order from payment, Payment is its own model that has total price of all the orderItems
# in the order related to the payment.
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.created_at)
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course.title} - {self.quantity}"
    

class Week(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    week_number = models.IntegerField(null=True, blank=True, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Week {self.week_number} - {self.course.title}"

    
class Day(models.Model):
    description = models.TextField(null=True, blank=True)
    week = models.ForeignKey(Week, on_delete=models.CASCADE)

class Exercise(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True) # Warmup | Exercise | Stretching
    sets = models.IntegerField(null=True,blank=True,default=0)
    reps = models.IntegerField(null=True,blank=True,default=0)
    duration = models.DurationField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # TODO: Here the admin can create a video as well so we'll need to see how we'll manage that
    video_url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    

# So each payment is related to a single order model.
class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=200, null=True, blank=True)
    tax_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    shipping_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Order {self.order.id}"
    #Whenever payment is saved it creates subscription for all the order items
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_paid:
            for item in self.Order.orderitem_set.all():
                Subscription.objects.create(user=self.user, course=item.course)

#When a payment is successfuly created
class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} subscribed to {self.course.name}"