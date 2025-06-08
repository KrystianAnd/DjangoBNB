from django.http import HttpRequest, JsonResponse
from property.serializers import ReservationsListSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import User
from .serializers import UserDetailSerializer


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request: HttpRequest, pk: int) -> JsonResponse:
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def reservations_list(request: HttpRequest) -> JsonResponse:
    reservations = request.user.reservations.all()
    serializer = ReservationsListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)
