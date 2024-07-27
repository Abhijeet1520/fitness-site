import stripe
from base.models import Payment, Subscription
from celery import shared_task


@shared_task
def update_payment_and_create_subscription(payment_intent_id):
    print("CELERY TASK IS BEING RUN")
    payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
    print("RETRIEVED PAYMENT INTENT FROM STRIPE USING PAYMENT_INTENT_ID")

    payment = Payment.objects.get(payment_intent_id=payment_intent.id)
    print("GOT PAYMENT OBJECT USING PAYMENT_INTENT_ID FROM DATABASE")

    payment.status = payment_intent.status
    payment.save()
    print("UPDATED PAYMENT OBJECT IN DB")


    # Create Subscription
    Subscription.objects.create(
        user=payment.user,
        course=payment.course
    )
    print("CREATED SUBSCRIPTION")


@shared_task
def temp_task(x, y):
   print(f'({x}, {y})')
   return "Done"