# Generated by Django 3.2.6 on 2024-07-29 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_day_day_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='day',
            name='image_url',
            field=models.TextField(blank=True, null=True),
        ),
    ]