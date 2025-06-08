from django.db.models.query import QuerySet
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from useraccount.models import User

from .forms import PropertyForm
from .models import Property, Reservations
from .serializers import PropertiesDetailSerializer, PropertiesListSerializer, ReservationsListSerializer


def get_user_from_request(request: HttpRequest) -> User | None:
    auth_header = request.META.get("HTTP_AUTHORIZATION", "")
    if auth_header.startswith("Bearer "):
        token_str = auth_header.split("Bearer ")[1]
        try:
            token = AccessToken(token_str)
            user_id = token.payload.get("user_id")
            return User.objects.get(pk=user_id)
        except (User.DoesNotExist, TokenError, KeyError):
            return None
    return None


def exclude_reserved_properties(
    properties: QuerySet[Property], checkin_date: str, checkout_date: str
) -> QuerySet[Property]:
    if not checkin_date or not checkout_date:
        return properties

    exact_matches = Reservations.objects.filter(start_date=checkin_date) | Reservations.objects.filter(
        end_date=checkout_date
    )
    overlap_matches = Reservations.objects.filter(
        start_date__lte=checkin_date,
        end_date__gte=checkout_date,
    )
    all_matches_ids = list({res.property_id for res in (exact_matches | overlap_matches)})
    return properties.exclude(id__in=all_matches_ids)


def apply_filters(properties: QuerySet[Property], request: HttpRequest, user: User | None) -> QuerySet[Property]:
    if landlord_id := request.GET.get("landlord_id"):
        properties = properties.filter(landlord_id=landlord_id)

    if request.GET.get("is_favorite") and user:
        properties = properties.filter(favorited=user)

    if guests := request.GET.get("numGuests"):
        properties = properties.filter(guests__gte=guests)

    if bedrooms := request.GET.get("numBedrooms"):
        properties = properties.filter(bedrooms__gte=bedrooms)

    if bathrooms := request.GET.get("numBathrooms"):
        properties = properties.filter(bathrooms__gte=bathrooms)

    if country := request.GET.get("country"):
        properties = properties.filter(country=country)

    if (category := request.GET.get("category")) and category != "undefined":
        properties = properties.filter(category=category)

    return properties


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def properties_list(request: HttpRequest) -> JsonResponse:
    user = get_user_from_request(request)
    properties = Property.objects.all()

    checkin_date: str = request.GET.get("checkIn", "")
    checkout_date: str = request.GET.get("checkOut", "")
    properties = exclude_reserved_properties(properties, checkin_date, checkout_date)
    properties = apply_filters(properties, request, user)

    favorites: list[int] = []
    if user:
        favorites = [prop.id for prop in properties if user in prop.favorited.all()]

    serializer = PropertiesListSerializer(properties, many=True)
    return JsonResponse(
        {
            "data": serializer.data,
            "favorites": favorites,
        }
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def properties_detail(request: HttpRequest, pk: int) -> JsonResponse:
    try:
        prop = Property.objects.get(pk=pk)
        serializer = PropertiesDetailSerializer(prop, many=False)
        return JsonResponse(serializer.data)
    except Property.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def property_reservations(request: HttpRequest, pk: int) -> JsonResponse:
    try:
        prop = Property.objects.get(pk=pk)
        reservations = prop.reservations.all()
        serializer = ReservationsListSerializer(reservations, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Property.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)


@api_view(["POST"])
def create_property(request: HttpRequest) -> JsonResponse:
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():
        prop = form.save(commit=False)
        prop.landlord = request.user
        prop.save()
        return JsonResponse({"success": True})

    return JsonResponse({"errors": form.errors.as_json()}, status=400)


@api_view(["POST"])
def book_property(request: HttpRequest, pk: int) -> JsonResponse:
    try:
        prop = Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)

    try:
        Reservations.objects.create(
            property=prop,
            start_date=request.POST.get("start_date", ""),
            end_date=request.POST.get("end_date", ""),
            number_of_nights=request.POST.get("number_of_nights", ""),
            total_price=request.POST.get("total_price", ""),
            guests=request.POST.get("guests", ""),
            created_by=request.user,
        )
        return JsonResponse({"success": True})
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)


@api_view(["POST"])
def toggle_favorite(request: HttpRequest, pk: int) -> JsonResponse:
    try:
        prop = Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)

    user = request.user
    if user in prop.favorited.all():
        prop.favorited.remove(user)
        return JsonResponse({"is_favorite": False})

    prop.favorited.add(user)
    return JsonResponse({"is_favorite": True})
