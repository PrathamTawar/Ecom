# Generated by Django 5.1.3 on 2024-11-15 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiView', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='allproduct',
            name='category',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='allproduct',
            name='desc',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='allproduct',
            name='product_name',
            field=models.CharField(max_length=100),
        ),
    ]
