# Generated by Django 3.2.6 on 2024-07-27 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_exercise_video_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='status',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
