from .serializers import UserDetailSerializer
from . models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from property.serializers import ReservationsListSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, pk):
    user = User.objects.get(pk=pk)

    serializer = UserDetailSerializer(user, many=False)

    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def reservations_list(request):
    reservations= request.user.reservations.all()
    serializer = ReservationsListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return JsonResponse({
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.name,
                "avatar": user.avatar.url if user.avatar else None
            },
            "access": access_token,
            "refresh": refresh_token
        })
    else:
        print("serializer.errors:", serializer.errors)  
    return JsonResponse(serializer.errors, status=400)