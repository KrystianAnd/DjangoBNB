from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view
from useraccount.models import User

from .models import Conversation
from .serializers import (
    ConversationDetailSerializer,
    ConversationMessageSerializer,
    ConversationsListSerializer,
)


@api_view(["GET"])
def conversations_list(request: HttpRequest) -> JsonResponse:
    serializer = ConversationsListSerializer(request.user.conversations.all(), many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def conversations_detail(request: HttpRequest, pk: int) -> JsonResponse:
    conversation = request.user.conversations.get(pk=pk)

    conversation_serializer = ConversationDetailSerializer(conversation, many=False)
    messages_serializer = ConversationMessageSerializer(conversation.messages.all(), many=True)

    return JsonResponse(
        {"conversation": conversation_serializer.data, "messages": messages_serializer.data},
        safe=False,
    )


@api_view(["GET"])
def conversations_start(request: HttpRequest, user_id: int) -> JsonResponse:
    conversations = Conversation.objects.filter(users__in=[user_id]).filter(users__in=[request.user.id])
    if conversations.exists():
        conversation = conversations.first()
        return JsonResponse({"success": True, "conversation_id": conversation.id})

    user = User.objects.get(pk=user_id)
    conversation = Conversation.objects.create()
    conversation.users.add(request.user)
    conversation.users.add(user)
    return JsonResponse({"success": True, "conversation_id": conversation.id})
