from django.db import models

class AllProduct(models.Model):
    product_img = models.ImageField(default="/media/default.png", blank=True)
    product_name = models.CharField(max_length=100)
    product_desc = models.TextField(default="", blank=True)
    product_category = models.CharField(max_length=100, default="")
    product_price = models.FloatField(default=0)
    product_isInCart = models.BooleanField(default=False)
    product_cartQuantity = models.PositiveBigIntegerField(default=0)