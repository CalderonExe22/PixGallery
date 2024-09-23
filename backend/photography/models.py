
from django.db import models
from accounts.models import User
from cloudinary.models import CloudinaryField
# Create your models here.

class Photografhy(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = CloudinaryField('image')
    precio = models.IntegerField(null=True)
    is_free = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title