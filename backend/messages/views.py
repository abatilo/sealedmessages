from .models import Message
from .serializers import CreateMessageSerializer, MessageSerializer
from rest_framework import viewsets


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return CreateMessageSerializer
        return MessageSerializer
