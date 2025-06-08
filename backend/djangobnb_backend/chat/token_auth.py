from collections.abc import Awaitable, Callable
from typing import Any
from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from useraccount.models import User

Scope = dict[str, Any]
Receive = Callable[[], Awaitable[dict]]
Send = Callable[[dict], Awaitable[None]]


@database_sync_to_async
def get_user(token_key: str | None) -> User | AnonymousUser:
    if token_key is None:
        return AnonymousUser()
    try:
        token = AccessToken(token_key)
        user_id = token.payload.get("user_id")
        return User.objects.get(pk=user_id)
    except (TokenError, User.DoesNotExist):
        return AnonymousUser()


class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner: Callable) -> None:
        self.inner = inner

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> Awaitable:
        query_string = scope.get("query_string", b"").decode()
        query_params: dict[str, list[str]] = parse_qs(query_string)
        token_list = query_params.get("token")
        token_key = token_list[0] if token_list else None

        scope["user"] = await get_user(token_key)
        return await super().__call__(scope, receive, send)
