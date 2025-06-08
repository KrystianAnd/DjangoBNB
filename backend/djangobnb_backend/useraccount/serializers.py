from typing import TYPE_CHECKING

from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from rest_framework import serializers

from .models import User

if TYPE_CHECKING:
    from .models import User as UserType


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "avatar_url")


User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=False, max_length=150)
    avatar = serializers.ImageField(required=False)

    def custom_signup(self, request: HttpRequest, user: "UserType") -> None:
        """Customize the user after registration."""
        _ = request
        user.name = self.validated_data.get("name", "")
        avatar = self.validated_data.get("avatar", None)
        if avatar:
            user.avatar = avatar
        user.save()
