# Generated by Django 3.2.6 on 2024-07-16 13:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('images', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_number', models.IntegerField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Week',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week_number', models.IntegerField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.course')),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscribed_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_intent_id', models.CharField(max_length=255, null=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('currency', models.CharField(max_length=10, null=True)),
                ('status', models.CharField(max_length=20, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.course')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise_number', models.IntegerField(blank=True, null=True)),
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('type', models.CharField(blank=True, max_length=200, null=True)),
                ('sets', models.IntegerField(blank=True, default=0, null=True)),
                ('reps', models.IntegerField(blank=True, default=0, null=True)),
                ('duration', models.DurationField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('video_url', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.day')),
                ('week', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.week')),
            ],
        ),
        migrations.AddField(
            model_name='day',
            name='week',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.week'),
        ),
    ]
