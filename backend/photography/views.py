from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.viewsets import ModelViewSet
from .models import Photografhy
from .serializer import SerializerPhotografhy

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class PhotografhyAPIView(ModelViewSet):
    queryset = Photografhy.objects.all()
    serializer_class = SerializerPhotografhy
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        print(f"Usuario actual: {self.request.user}")
        serializer.save(user=self.request.user)