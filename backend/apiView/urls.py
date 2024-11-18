from . import views
from django.urls import path

urlpatterns = [
    path('getproducts/<int:pk>', views.getProducts, name= 'getdata'),
    path('setproducts', views.setProducts, name= 'setdata'),
    path('changeproducts/<int:pk>', views.changeProducts, name= 'changeproducts'),
    path('cartitems/<int:pk>', views.cartProducts, name= 'cartitems'),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)