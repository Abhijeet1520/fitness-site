from django.urls import path, include
from base.views import user_views as views


urlpatterns = [
    # path('register/',views.registerUser,name='register'),
    # path('',views.getUsers,name="users"),
    # path('profile/',views.getUserProfile,name="user_profile"),
    # path('profile/update/',views.updateUserProfile,name="user_profile_update"),
    # path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('<str:pk>/',views.getUserById,name="get_user"),
    # path('update/<str:pk>/',views.updateUser,name="updateUser"),
    # path('delete/<str:pk>/',views.deleteUser,name="deleteUser"),
    path('current_user_detail/', views.UserDetailView.as_view(), name='user_detail'),
    path('update/', views.UserUpdateView.as_view(), name="user_update"),
    path('register/', views.UserCreateView.as_view(), name='user_register'),
    path('delete/', views.UserDeleteView.as_view(), name='user-delete'),#Normal User
    path('delete/<int:pk>/', views.UserDeleteView.as_view(), name='user-delete-admin'),#Admin
    path('create_admin_user/', views.AdminUserCreateView.as_view(), name="user-create-admin"),#Admin
]
