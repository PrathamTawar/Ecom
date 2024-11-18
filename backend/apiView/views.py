from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AllProduct
from .serializer import ProductSerializer



@api_view(['GET'])
def getProducts(request, pk = None):
    
    if not pk:
        serializer = ProductSerializer(AllProduct.objects.all(), many=True)
        data = serializer.data
        return Response(data)

    item = AllProduct.objects.get(id=pk)
    serializer = ProductSerializer(item)
    data = serializer.data
    return Response(data)


@api_view(['POST'])
def setProducts(request):
    
    serializer = ProductSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)
    
    
@api_view(['DELETE', 'PUT'])
def changeProducts(request, pk):
    
    item = AllProduct.objects.get(id=pk)
    
    if request.method == 'DELETE':
        item.delete()
        try:
            return Response('Item deleted')
        except Exception as e:
            return Response('Error= ', e)
    
    elif request.method == 'PUT':
        
        item.product_name = request.data['product_name']
        item.product_desc = request.data['product_desc']
        item.product_category = request.data['product_category']
        item.product_price = request.data['product_price']
        product_img = request.data['product_img']
        
        if product_img != 'undefined':
            item.product_img = product_img
        
        item.save() 
        
        try:
            return Response('edited')
        except Exception as e:
            return Response('Error= ', e)
        
        
@api_view(['PUT'])
def cartProducts(request, pk):
    
    item = AllProduct.objects.get(id=pk)
    
    if 'todo' in request.data:
        if request.data['todo'] == 'add':
            item.product_cartQuantity += 1
            item.save()
            return Response('+1')
    
        
        item.product_cartQuantity -= 1
        if not item.product_cartQuantity:
            item.product_isInCart = False
        item.save()
        return Response('-1')
    
    
    
   
    item.product_isInCart = request.data['product_isInCart']
    if item.product_isInCart:
        item.product_cartQuantity += 1
    else:
        item.product_cartQuantity = 0
    item.save()
    
    return Response('Item added to cart')