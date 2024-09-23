from rest_framework.serializers import ModelSerializer
from .models import Profile
from django.contrib.auth import authenticate

class ProfileSerializer(ModelSerializer): 
    class Meta:
        model = Profile
        fields = ['profile_name','name','lastname','biography','profile_photo','created_at']
