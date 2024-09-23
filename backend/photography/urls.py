from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PhotografhyAPIView
from rest_framework.documentation import include_docs_urls

router = DefaultRouter()
router.register(r'photography',PhotografhyAPIView,'photography')

urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='Photos API'))
]
