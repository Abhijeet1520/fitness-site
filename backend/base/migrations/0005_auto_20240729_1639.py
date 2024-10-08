# Generated by Django 3.2.6 on 2024-07-29 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_coursedetail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursedetail',
            name='detail',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='coursedetail',
            name='detail_num',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='coursedetail',
            name='image_url',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='coursedetail',
            name='question',
            field=models.TextField(blank=True, null=True),
        ),
    ]
