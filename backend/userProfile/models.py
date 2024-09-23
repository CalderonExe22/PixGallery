from django.db import models
from accounts.models import User
from cloudinary.models import CloudinaryField
# Create your models here.

class Profile(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_name = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    biography = models.CharField(max_length=100)
    profile_photo = CloudinaryField('image')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.profile_name
    