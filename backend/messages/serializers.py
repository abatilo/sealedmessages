import logging
from django.utils import timezone
from rest_framework import serializers
from .models import Message


class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "revealed_date", "title", "content"]


class MessageSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    revealed = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            "id",
            "created_date",
            "revealed_date",
            "title",
            "content",
            "revealed",
        ]

    def get_content(self, obj):
        if obj.revealed_date < timezone.now():
            return obj.content
        return f"Unavailable"

    def get_revealed(self, obj):
        if obj.revealed_date < timezone.now():
            return True
        return False
