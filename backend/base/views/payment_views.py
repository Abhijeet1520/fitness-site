import stripe
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.conf import settings
from base.models import Payment, Subscription, Order
from base.serializers import PaymentSerializer

#This is my secrete stripe key
stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentCreateView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Extract the payment details from the request data
        data = request.data
        user = request.user

        # Create a PaymentIntent on Stripe
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(data['amount']),
                currency='usd',
                payment_method=data['payment_method_id'],
                confirm=True,
                error_on_requires_action=True,
            )
        except stripe.error.CardError as e:
            # Handle any card errors
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.StripeError as e:
            # Handle any other Stripe errors
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # If payment is successful, create the Payment record and subscriptions
        if intent.status == 'succeeded':
            order = Order.objects.get(id=data['order_id'])
            payment = Payment.objects.create(
                user=user,
                order=order,
                payment_method=data['payment_method'],
                tax_price=data.get('tax_price', 0),
                shipping_price=data.get('shipping_price', 0),
                total_price=data['total_price'],
                is_paid=True,
                paid_at=intent.created,
            )

            # Create subscriptions for each order item
            for item in order.orderitem_set.all():
                Subscription.objects.create(user=user, course=item.course)

            serializer = self.get_serializer(payment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': 'Payment failed'}, status=status.HTTP_400_BAD_REQUEST)
