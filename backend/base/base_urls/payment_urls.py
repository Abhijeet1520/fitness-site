from django.urls import path
from base.views.payment_views import CreatePaymentIntentView, StripeWebhookView, celeryTestView

urlpatterns = [
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('stripe-webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
    path('celery_test/', celeryTestView.as_view(), name='celery_test')
]
