from .views import *
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    #El método as_view() en Django es utilizado para convertir una clase basada en vistas (class-based view o CBV) en una función basada en vistas (function-based view o FBV). 
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/', UserLogoutAPIView.as_view(), name='logout'),
    # Permite a los clientes obtener nuevos tokens de acceso utilizando un refresh token válido.
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserInfoAPIView.as_view(), name='user-info')
]
