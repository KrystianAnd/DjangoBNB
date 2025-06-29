'use client';

import { useEffect , useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps{
    landlord_id? : string | null;
    favorites? : boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBedrooms = searchModal.query.bedrooms;
    const numBathrooms = searchModal.query.bathrooms;
    const checkInDate = searchModal.query.checkIn;
    const checkOutDate = searchModal.query.checkOut;
    const category = searchModal.query.category;
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const router = useRouter();

    const markFavorite = (id: string, is_favorite: boolean) =>{
        const tmpProperties = properties.map((property: PropertyType) =>{
            if (property.id == id){
                property.is_favorite = is_favorite
                
                if (is_favorite){
                    alert('added to list of favorited');
                } else{
                    alert('removed from list ');
                }
            }

            return property
        })

        setProperties(tmpProperties);
    }

    const getProperties = async () => {
        let url =  '/api/properties/';

        if(landlord_id){
            url += `?landlord_id=${landlord_id}`
        }else if (favorites){
            url += '?is_favorite=true'
        } else {
            let urlQuery = '';

            if (country){
                urlQuery += '&country=' + country
            }
            if (numGuests){
                urlQuery += '&numGuests=' + numGuests
            }
            if (numBathrooms){
                urlQuery += '&numBathrooms=' + numBathrooms
            }
            if (numBedrooms){
                urlQuery += '&numBedrooms=' + numBedrooms
            }
            if (checkInDate){
                urlQuery += '&checkInDate=' + format(checkInDate, 'yyyy-MM-dd')
            }
            if (checkOutDate){
                urlQuery += '&checkOutDate=' + format(checkOutDate, 'yyyy-MM-dd')
            }
            if (category){
                urlQuery += '&category=' + category
            }

            if(urlQuery.length){
                

                urlQuery = "?" + urlQuery.substring(1);

                url += urlQuery;
            }
        }

        const tmpProperties = await apiService.get(url)

        setProperties(tmpProperties.data.map((property: PropertyType) => {
            if(tmpProperties.favorites.includes(property.id)){
                property.is_favorite = true
            }else{
                property.is_favorite = false
            }
            return property
        }));
    };

    useEffect(() =>{
        getProperties();
    }, [category, searchModal.query, params]);

    return (
        <>
            {properties.length === 0 ? (
                <div className="col-span-5 text-center">
                    <h2 className="text-2xl font-semibold mb-4">No properties found</h2>
                    <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
                    <CustomButton
                        label="Back"
                        onClick={() => {
                            searchModal.reset(); 
                            router.replace('/');
                        }}
                        className="mt-4 max-w-xs mx-auto"    
                    />
                </div>
            ) : (
                properties.map((property) => (
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                ))
            )}
        </>
    );
}

export default PropertyList;