from django.shortcuts import render
from .serializer import *
from rest_framework.generics import GenericAPIView,RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

# GenericAPIView es una clase base en Django REST Framework (DRF) que proporciona una gran cantidad de funcionalidad para crear vistas API personalizadas 
# sin tener que reinventar el ciclo básico de petición/respuesta. Es útil cuando necesitas una vista personalizada con lógica específica, 
# pero aún quieres beneficiarte de muchas características predefinidas como serialización, paginación, y permisos.

class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,) # Permitir que cualquier persona se registre
    serializer_class = UserRegistrationSerializer # Indica el serializador a usar

    def post(self, request, *args, **kwargs):
        # Usar el serializador definido en serializer_class
        serializer = self.get_serializer(data = request.data)
        # ejecuta el validate del serializador definido en serializer_class
        serializer.is_valid(raise_exception=True)
        # ejecuta el create del serializador definido en serializer_class
        user = serializer.save() 
        # Crear un refresh token para el usuario registrado
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['tokens'] = {
            'refresh' : str(token),
            'access' : str(token.access_token)
        }
        
        #Response permite enviar datos al cliente, pero está optimizada para las APIs al trabajar directamente con datos serializados y soportar múltiples formatos (como JSON).
        return Response(data, status=status.HTTP_201_CREATED)

class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #Una vez que los datos han sido validados, validated_data contiene el usuario autenticado si las credenciales son correctas.
        user = serializer.validated_data
        #Se usa UserSerializer para serializar el objeto user en formato JSON.
        serializer = UserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['tokens'] = {
            'refresh' : str(token),
            'access' : str(token.access_token)
        }
        return Response(data, status=status.HTTP_200_OK)

class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            # El refresh_token se extrae de los datos de la solicitud (request.data), asumiendo que el cliente envía el refresh token en el cuerpo de la solicitud como parte del cierre de sesión.
            refresh_token = request.data['refresh']
            # Se crea una instancia de RefreshToken utilizando el token de actualización (refresh token) que se ha pasado desde el cliente.
            token = RefreshToken(refresh_token)
            # El método blacklist() coloca el refresh token en la lista negra. Esto asegura que no se pueda reutilizar para obtener nuevos tokens de acceso.
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user