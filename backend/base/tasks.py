import stripe
from base.models import Payment, Subscription
from celery import shared_task


@shared_task
def update_payment_and_create_subscription(payment_intent_id):

    payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)

    payment = Payment.objects.get(payment_intent_id=payment_intent.id)
    payment.status = payment_intent.status
    payment.save()

    # Create Subscription
    Subscription.objects.create(
        user=payment.user,
        course=payment.course
    )


@shared_task
def temp_task(x, y):
   print(f'({x}, {y})')
   return "Done"