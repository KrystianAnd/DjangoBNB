from rest_framework import serializers

from .models import Property, Reservations
from useraccount.serializers import UserDetailSerializer

class PropertiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property 
        fields = (
            'id',
            'title',
            'price_per_night',
            'image_url',
        )

class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Property 
        fields = (
            'id',
            'title',
            'description',
            'price_per_night',
            'image_url',
            'bedrooms',
            'bathrooms',
            'guests',
            'landlord'
        )

    def get_image_url(self, obj):
        return obj.image_url() 


class ReservationsListSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True, many=False)

    class Meta:
        model = Reservations
        fields = (
            'id',
            'start_date',
            'end_date',
            'number_of_nights',
            'total_price',
            'property'
        )