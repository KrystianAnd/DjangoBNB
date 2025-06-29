from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView, LogoutView
from django.urls import path

from . import api
from .views import CustomRegisterView

urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("myreservations/", api.reservations_list, name="api_reservations_list"),
    path("<uuid:pk>/", api.landlord_detail, name="api_landlord_detail"),
]
