# Un serializer en Django REST Framework (DRF) es una herramienta que convierte datos 
# complejos, como instancias de modelos de Django o conjuntos de datos de Python, en formatos
# más simples como JSON o XML, y viceversa. Esto es especialmente útil cuando trabajas con APIs 
# que necesitan enviar y recibir datos en formato JSON.

from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')

class UserRegistrationSerializer(serializers.ModelSerializer):
    # define un campo de texto (CharField) con dos opciones específicas: write_only y required
    # write_only=True: El campo es de solo escritura. No se devolverá en las respuestas.
    # required=True: El campo es obligatorio y debe estar presente en los datos de entrada.

    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta: 
        model = User
        fields = ('id','username','email','password1','password2')
        extra_kwargs = {
            'password' : {'write_only':True}
        }#extra_kwargs dentro de un ModelSerializer te permite personalizar los atributos de los campos del modelo que se incluyen en el serializador. Es útil cuando quieres ajustar cómo se comportan ciertos campos sin necesidad de redefinirlos explícitamente en el serializer.

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2'] :
            raise serializers.ValidationError('Las contraseñas no son iguales!!')
        password = attrs.get('password1','')  
        if len(password) < 8:
            raise serializers.ValidationError('password must be at least 8 characters!')
        return attrs

    def create(self, validated_data):
        #.pop() se utiliza para eliminar y retornar un elemento de un diccionario o una lista.
        # Cuando se usa .pop() en un serializer, se eliminan datos que no deben ser guardados en la base de datos o que no deben ser procesados por el modelo.
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        # creamos un nuevo usuario usando create_user(), es como create() solo que esta funcion nos encripta la contraseña por nosotros
        user =  User.objects.create_user(password=password,**validated_data)
        #Buscar (get): Intenta encontrar un objeto en el modelo Rol donde el campo name sea igual a 'fotógrafo'.
        #Crear (create): Si no existe tal objeto, lo crea con los datos proporcionados.
        fotografo_role, created = Rol.objects.get_or_create(name='fotógrafo')
        RolUser.objects.create(user_id=user, rol_id=fotografo_role)
        return user

#serializers.Serializer en lugar de serializers.ModelSerializer ya que no estás creando o actualizando una instancia del modelo, sino simplemente validando las credenciales
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active : 
            return user
        raise serializers.ValidationError('Datos incorrectos') 