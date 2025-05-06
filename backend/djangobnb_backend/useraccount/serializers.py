from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'avatar_url'
        )

User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=False, max_length=150)
    avatar = serializers.ImageField(required=False)

    def custom_signup(self, request, user):
        user.name = self.validated_data.get('name', '')
        avatar = self.validated_data.get('avatar', None)
        if avatar:
            user.avatar = avatar
        user.save()
