from rest_framework import serializers

from . models import ConversationMessage, Conversation

from useraccount.serializers import UserDetailSerializer


class ConversationsListSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'users', 'modified_at',]

class ConversationDetailSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)
    
    class Meta:
        model = Conversation
        fields = ['id', 'users', 'modified_at',]

class ConversationMessageSerializer(serializers.ModelSerializer):
    sent_to = UserDetailSerializer( read_only=False)
    created_by = UserDetailSerializer( read_only=False)

    class Meta:
        model = ConversationMessage
        fields = ['id', 'body', 'sent_to', 'created_by',]