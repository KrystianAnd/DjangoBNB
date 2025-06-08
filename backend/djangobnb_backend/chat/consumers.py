import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import ConversationMessage


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self) -> None:
        self.room_name: str = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name: str = f"chat_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self, _close_code: int) -> None:
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

    async def receive(self, text_data: str | None = None) -> None:
        data = json.loads(text_data)

        conversation_id: int = data["data"]["conversation_id"]
        sent_to_id: int = data["data"]["sent_to_id"]
        name: str = data["data"]["name"]
        body: str = data["data"]["body"]

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "body": body,
                "name": name,
            },
        )

        await self.save_message(conversation_id, body, sent_to_id)

    async def chat_message(self, event: dict) -> None:
        body: str = event["body"]
        name: str = event["name"]

        await self.send(
            text_data=json.dumps(
                {
                    "body": body,
                    "name": name,
                }
            )
        )

    @sync_to_async
    def save_message(self, conversation_id: int, body: str, sent_to_id: int) -> None:
        user = self.scope["user"]
        ConversationMessage.objects.create(
            conversation_id=conversation_id,
            body=body,
            sent_to_id=sent_to_id,
            created_by=user,
        )
