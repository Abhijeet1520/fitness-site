from django.shortcuts import get_object_or_404
from rest_framework import permissions
from base.models import Course, Week, Day, Exercise

class IsUserSubscribedToThisCourse_Course(permissions.BasePermission):
    message = "You must be subscribed to this course to access this."
    def has_permission(self, request, view):
        course_id = view.kwargs.get('course_id')
        if course_id is None:
            return False
        
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Get the course object
        course = get_object_or_404(Course, id=course_id)
        
        # Check if the user is subscribed to the course
        user_subscribed_courses = request.user.subscriptions.values_list('course_id', flat=True)
        if course.id in user_subscribed_courses:
            return True
        
        return False


class IsUserSubscribedToThisCourse_Week(permissions.BasePermission):
    message = "You must be subscribed to this course to access this."
    def has_permission(self, request, view):
        week_id = view.kwargs.get('week_id')
        if week_id is None:
            return False
        
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Get the course associated with the week
        try:
            week = Week.objects.get(id=week_id)
            course = week.course
        except Week.DoesNotExist:
            return False
        
        # Check if the user is subscribed to the course
        user_subscribed_courses = request.user.subscriptions.values_list('course_id', flat=True)
        if course.id in user_subscribed_courses:
            return True
        
        return False


class IsUserSubscribedToThisCourse_Day(permissions.BasePermission):
    message = "You must be subscribed to this course to access this."
    def has_permission(self, request, view):
        day_id = view.kwargs.get('day_id')
        if day_id is None:
            return False
        
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Get the day object and its associated week
        day = get_object_or_404(Day, id=day_id)
        week = day.week
        
        # Get the course associated with the week
        course = week.course
        
        # Check if the user is subscribed to the course
        user_subscribed_courses = request.user.subscriptions.values_list('course_id', flat=True)
        if course.id in user_subscribed_courses:
            return True
        
        return False
    
class IsUserSubscribedToThisCourse_Exercise(permissions.BasePermission):
    message = "You must be subscribed to this course to access this."
    def has_permission(self, request, view):
        exercise_id = view.kwargs.get('exercise_id')
        if exercise_id is None:
            return False
        
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Get the exercise object and its associated day and week
        exercise = get_object_or_404(Exercise, id=exercise_id)
        day = exercise.day
        week = day.week
        
        # Get the course associated with the week
        course = week.course
        
        # Check if the user is subscribed to the course
        user_subscribed_courses = request.user.subscriptions.values_list('course_id', flat=True)
        if course.id in user_subscribed_courses:
            return True
        
        return False

