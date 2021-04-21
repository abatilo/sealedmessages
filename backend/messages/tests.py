from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.test.client import RequestFactory
from django.utils.timezone import make_aware
import pytz
from rest_framework.test import APIClient, APITestCase

from .models import Message

# Create your tests here.
class MessageTest(APITestCase):
    def setUp(self) -> None:
        now = datetime.utcnow()
        one_week_earlier = make_aware(
            datetime.utcnow() + timedelta(weeks=-1), timezone=pytz.UTC
        )
        one_week_later = make_aware(
            datetime.utcnow() + timedelta(weeks=1), timezone=pytz.UTC
        )
        Message.objects.create(
            title="Message 1", content="Message 1", revealed_date=one_week_earlier
        )
        Message.objects.create(
            title="Message 2", content="Message 2", revealed_date=one_week_later
        )

        self.factory = RequestFactory()
        self.user = User.objects.create_user(username="username", password="password")

    def test_messages_are_in_desc_created_date_order(self):
        self.client.login(username="username", password="password")
        response = self.client.get("/api/v1/messages")
        dates = [message["created_date"] for message in response.data["results"]]
        self.assertListEqual(dates, sorted(dates, reverse=True))

    def test_server_side_revealed(self):
        self.client.login(username="username", password="password")
        response = self.client.get("/api/v1/messages")
        messages = response.data["results"]
        message_1 = messages[1]
        message_2 = messages[0]

        self.assertEquals(message_1["title"], "Message 1")
        self.assertTrue(message_1["revealed"])
        self.assertEquals(message_1["content"], "Message 1")

        self.assertEquals(message_2["title"], "Message 2")
        self.assertFalse(message_2["revealed"])
        self.assertEquals(message_2["content"], "Unavailable")
