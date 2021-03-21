import logging
from django.utils import timezone
from http import HTTPStatus
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .models import Message
from .serializers import MessageSerializer
from rest_framework.views import APIView

# Create your views here.

logger = logging.getLogger(__name__)


class MessageList(APIView):
    """
    List all messages, or create a new message.
    """

    def get(self, request, format=None):
        messages = Message.objects.all()
        for message in messages:
            if timezone.now() < message.revealed:
                message.content = "<Unavailable>"

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTPStatus.CREATED)
        return Response(serializer.errors, status=HTTPStatus.BAD_REQUEST)


class MessageDetail(APIView):
    """
    Retrieve, update or delete a message.
    """

    def get_object(self, pk):
        try:
            return Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        message = self.get_object(pk)
        if timezone.now() < message.revealed:
            message.content = "<Unavailable>"

        serializer = MessageSerializer(message)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        message = self.get_object(pk)
        serializer = MessageSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTPStatus.BAD_REQUEST)

    def delete(self, request, pk, format=None):
        message = self.get_object(pk)
        message.delete()
        return Response(status=HTTPStatus.NO_CONTENT)
