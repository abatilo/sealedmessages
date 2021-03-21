from django.utils import timezone
from rest_framework import viewsets

from .models import Message
from .serializers import CreateMessageSerializer, MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return CreateMessageSerializer
        return MessageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        revealed = self.request.query_params.get("revealed", None)
        if revealed:
            queryset = queryset.filter(revealed_date__lt=timezone.now())
        return queryset
