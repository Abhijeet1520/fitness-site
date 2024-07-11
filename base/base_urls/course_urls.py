from django.urls import path
from base.views import course_views as views


# urlpatterns = [
#     path('',views.getProducts,name="products"),

#     path('create/',views.createProduct,name="create_product"),
#     path('upload/',views.uploadImage,name="upload_image"),

#     path('<str:pk>/reviews/',views.createProductReview,name="create-review"),
#     path('top/',views.getTopProducts,name="top-products"),
#     path('<str:pk>/',views.getProduct,name="product"),

#     path('update/<str:pk>/',views.updateProduct,name="update_product"),
#     path('delete/<str:pk>/',views.deleteProduct,name="delete_product"),
# ]


urlpatterns = [
    path('create/', views.CourseCreateView.as_view(), name='course-create'),
    path('delete/<int:pk>/', views.CourseDeleteView.as_view(), name='course-delete'),
    path('list/', views.CourseListView.as_view(), name='course-list'),
    path('subscribed/', views.UserSubscribedCoursesView.as_view(), name='user-subscribed-courses'),
    path('detail/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('update/<int:pk>/', views.CourseUpdateView.as_view(), name='course-update'),
    path('detail-with-subscriptions/<int:pk>/', views.CourseDetailWithSubscriptionsView.as_view(), name='course-detail-subscriptions'),
]
