import json
import os
from django.http import JsonResponse
import stripe
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.conf import settings
from base.models import Payment, Subscription, Course
from base.serializers import PaymentSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from base.tasks import update_payment_and_create_subscription, temp_task
from rest_framework.views import APIView


# This is my secrete stripe key
# stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.api_key = 'sk_test_51PaeGKRoRlCW2Nqt8PdddrkxoxYhfV3I33IRzTvpNXmD6MFEe8MHUjyIDROdWKfuJuvsY49usXgH5vIkX9ChUGrc00Nsttapmj'

# we need to exempt it from csrf as this comes from stripe
class CreatePaymentIntentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            course_id = data.get('courseId')

            # Fetch the Course object or return a 404 if not found
            course = get_object_or_404(Course, pk=course_id)

            # Calculate the order amount based on course price
            amount = course.price

            # Create a PaymentIntent with the calculated amount
            intent = stripe.PaymentIntent.create(
                amount=round(amount * 100),  # Stripe expects amount in cents
                currency='aud',
                automatic_payment_methods={'enabled': True},
            )

            # Create Payment Model
            payment = Payment.objects.create(
                user=request.user,
                amount=amount,
                currency='aud',
                status=intent.status,
                course=course,
                payment_intent_id=intent.id
            )

            # Return clientSecret to frontend
            return Response({'clientSecret': intent.client_secret})

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)


# Strip Payment Success Webhook
# endpoint secret key
# Make sure to return 200K quickly before updating database(STRIPE timeout requirement)
@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        payload = request.body
        # endpoint secret key
        endpoint_secret = os.getenv('STRIPE_ENDPOINT_SECRET')
        event = None

        # Check if the payload is decodable or not
        try:
            json.loads(payload)
        except json.decoder.JSONDecodeError as e:
            print('Webhook error while parsing basic request.' + str(e))
            return Response(status=400)
        # print("THIS IS THE ENDPOINT_SECRET")
        # print(endpoint_secret)
        # print("ENDPOINT SECRET KEY ENDS HERE")
        if endpoint_secret:
            try:
                # print("ENTERED THE EVENT CONSTRUCT")
                # print(event)
                sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
                # print("GOT THE SIGNATURE HEADER")
                event = stripe.Webhook.construct_event(
                    payload, sig_header, endpoint_secret
                )
                # print("EXITED THE EVENT CONSTRUCT")
                # print(event)

            except ValueError as e:
                print("ERROR")
                print(e)
                # Invalid payload
                return Response(status=status.HTTP_400_BAD_REQUEST)
            except stripe.error.SignatureVerificationError as e:
                # Invalid signature
                print("ERROR SIGNATURE VERIFICATION")
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)

        # Handle the event
        if event.type == 'payment_intent.succeeded':
            payment_intent_id = event['data']['object']['id']
            print('Payment for {} succeeded'.format(payment_intent_id))
            update_payment_and_create_subscription.delay(payment_intent_id)


        return Response(status=status.HTTP_200_OK)
    

class celeryTestView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        temp_task.delay(1, 2)
        return JsonResponse({'message': 'success'})
