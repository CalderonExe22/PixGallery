from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

# Create your models here.

# AbstractUser es una buena idea si planeas personalizar el modelo de usuario para añadir campos adicionales o modificar el comportamiento del usuario estándar que ofrece Django. Esto te permite 
# mantener las funcionalidades predeterminadas del sistema de usuarios de Django, mientras te da flexibilidad para adaptarlo a tus necesidades específicas.

class User(AbstractUser):
    
    #EmailField es un tipo de campo de modelo que se utiliza para almacenar direcciones de correo electrónico
    #unique=True : no se puede repetir email(no duplicadas)
    email = models.EmailField(unique=True)
    
    #Esto le dice a Django que el campo email será el identificador único (nombre de usuario) que se usará para iniciar sesión.
    USERNAME_FIELD = 'email'
    
    # Este es un conjunto de campos que también serán obligatorios cuando se cree un superusuario a través del comando createsuperuser. En este caso, además de email, también se pedirá username.
    REQUIRED_FIELDS = ['username']
    
    #__str__ es un método especial que controla cómo se muestra una instancia del objeto cuando lo conviertes a cadena (por ejemplo, cuando haces print()).
    #-> str es una anotación que indica que el método debe devolver un tipo de dato str.
    def __str__(self) -> str:
        return self.email
    
class Rol(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
class RolUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    rol_id = models.ForeignKey(Rol, on_delete=models.CASCADE)
    