from django.db import models

# Create your models here.
class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    revealed = models.DateTimeField(db_index=True)
    title = models.CharField(max_length=100, blank=False, default="")
    content = models.TextField()

    class Meta:
        ordering = ["created"]
