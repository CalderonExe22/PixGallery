from django.shortcuts import render
from .serializer import ProfileSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Profile
# Create your views here.

class CreateProfileAPIView(ModelViewSet): 
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Profile.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)