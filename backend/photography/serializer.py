from rest_framework.serializers import ModelSerializer
from .models import Photografhy

class SerializerPhotografhy(ModelSerializer):
    class Meta:
        model = Photografhy
        fields = ['id', 'title', 'description', 'image', 'precio', 'is_free', 'created_at']