import uuid
from django.db import models

# Create your models here.
class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_date = models.DateTimeField(auto_now_add=True)
    revealed_date = models.DateTimeField(db_index=True)
    title = models.CharField(max_length=100, blank=False, default="")
    content = models.TextField()

    class Meta:
        ordering = ["-created_date"]
