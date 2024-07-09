from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh_token"),
    # path('api/',include('base.urls')),
    # path('',TemplateView.as_view(template_name='index.html')),
    # path('api/products/',include('base.urls.product_urls')),
    # path('api/users/',include('base.urls.user_urls')),
    # path('api/orders/',include('base.urls.order_urls')),
    path('api-auth/', include('rest_framework.urls')),
    path("api/", include("base.urls")),
]

# urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)

