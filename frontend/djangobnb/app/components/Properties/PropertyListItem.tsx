'use client';

import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import { getUserId } from "@/app/lib/actions";
import { useEffect, useState } from "react";

interface PropertyProps {
    property: PropertyType;
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    markFavorite
}) => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null | undefined>(undefined); 

    useEffect(() => {
        const fetchUserId = async () => {
            const uid = await getUserId();
            setUserId(uid);
        };
        fetchUserId();
    }, []);

    return (
        <div
            onClick={() => router.push(`/properties/${property.id}`)}
            className="cursor-pointer"
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px,(max-width: 1200px) 768px, 768px "
                    className="hover:scale-110 object-cover transition h-full w-full "
                    alt="Beach house"
                />
                {userId !== undefined && markFavorite && (
                    <FavoriteButton
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={markFavorite}
                        userId={userId}
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    <strong>${property.price_per_night}</strong> per night
                </p>
            </div>
        </div>
    );
};

export default PropertyListItem;
