import logging
from django.utils import timezone
from rest_framework import viewsets

from .models import Message
from .serializers import CreateMessageSerializer, MessageSerializer
from .tasks import add


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def list(self, request, *args, **kwargs):
        # r = add.delay(1, 2)
        # logging.info(r.get())
        return super().list(self, request, *args, **kwargs)

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
