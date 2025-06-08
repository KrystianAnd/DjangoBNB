import uuid
from typing import ClassVar

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models


class CustomUserManager(UserManager):
    def _create_user(
        self, name: str | None, email: str, password: str | None, **extra_fields: dict[str, object]
    ) -> "User":
        if not email:
            msg = "You have not specified a valid e-mail address"
            raise ValueError(msg)

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(
        self,
        name: str | None = None,
        email: str | None = None,
        password: str | None = None,
        **extra_fields: dict[str, object],
    ) -> "User":
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(name, email, password, **extra_fields)

    def create_superuser(
        self,
        name: str | None = None,
        email: str | None = None,
        password: str | None = None,
        **extra_fields: dict[str, object],
    ) -> "User":
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to="uploads/avatars", blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD: ClassVar[str] = "email"
    EMAIL_FIELD: ClassVar[str] = "email"
    REQUIRED_FIELDS: ClassVar[list[str]] = ["name"]

    def avatar_url(self) -> str:
        if self.avatar:
            return f"{settings.WEBSITE_URL}{self.avatar.url}"
        return ""

    def __str__(self) -> str:
        return self.email or "Unnamed User"
