import uuid

from django.db import models
from useraccount.models import User


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    users = models.ManyToManyField(User, related_name="conversations")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        usernames = ", ".join(user.username for user in self.users.all())
        return f"Conversation ({self.id}) between {usernames}"


class ConversationMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(Conversation, related_name="messages", on_delete=models.CASCADE)
    body = models.TextField()
    sent_to = models.ForeignKey(User, related_name="received_messages", on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, related_name="sent_messages", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Message from {self.created_by.username} to {self.sent_to.username} at {self.created_at}"
