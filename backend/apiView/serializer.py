from rest_framework.serializers import ModelSerializer
from .models import AllProduct

class ProductSerializer(ModelSerializer):
    class Meta:
        model = AllProduct
        fields = '__all__'