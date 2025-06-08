from typing import ClassVar

from rest_framework import serializers
from useraccount.serializers import UserDetailSerializer

from .models import Conversation, ConversationMessage


class ConversationsListSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model: ClassVar[type[Conversation]] = Conversation
        fields: ClassVar[list[str]] = ["id", "users", "modified_at"]


class ConversationDetailSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model: ClassVar[type[Conversation]] = Conversation
        fields: ClassVar[list[str]] = ["id", "users", "modified_at"]


class ConversationMessageSerializer(serializers.ModelSerializer):
    sent_to = UserDetailSerializer(read_only=False)
    created_by = UserDetailSerializer(read_only=False)

    class Meta:
        model: ClassVar[type[ConversationMessage]] = ConversationMessage
        fields: ClassVar[list[str]] = ["id", "body", "sent_to", "created_by"]
