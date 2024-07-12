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


# This is my secrete stripe key
stripe.api_key = settings.STRIPE_SECRET_KEY

# we need to exempt it from csrf as this comes from stripe
@method_decorator(csrf_exempt, name='dispatch')
class CreatePaymentIntentView(generics.APIView):
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
                amount=amount * 100,  # Stripe expects amount in cents
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
class StripeWebhookView(generics.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
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
        if endpoint_secret:
            try:
                sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
                event = stripe.Webhook.construct_event(
                    payload, sig_header, endpoint_secret
                )
            except ValueError as e:
                # Invalid payload
                return Response(status=status.HTTP_400_BAD_REQUEST)
            except stripe.error.SignatureVerificationError as e:
                # Invalid signature
                return Response(status=status.HTTP_400_BAD_REQUEST)

        # Handle the event
        if event.type == 'payment_intent.succeeded':
            payment_intent = event.data.object['id']
            print('Payment for {} succeeded'.format(payment_intent['amount']))
            #TODO: Use Celery & Redis here to handle this asynchronously
            payment = Payment.objects.get(payment_intent_id=payment_intent.id)
            payment.status = payment_intent.status
            payment.save()

            # Create Subscription
            Subscription.objects.create(
                user=payment.user, course=payment.course)

        return Response(status=status.HTTP_200_OK)
