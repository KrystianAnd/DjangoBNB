'use client';

import { useState } from "react";
import Image from "next/image";
import useSearchModal , {SearchQuery}from "../hooks/useSearchModal";

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);
    
        const currentQuery = searchModal.query || {};
    
        const query: SearchQuery = {
            country: currentQuery.country ?? '',
            checkIn: currentQuery.checkIn ?? undefined,
            checkOut: currentQuery.checkOut ?? undefined,
            guests: currentQuery.guests ?? 1,
            bedrooms: currentQuery.bedrooms ?? 0,
            bathrooms: currentQuery.bathrooms ?? 0,
            category: _category
        }
    
        searchModal.setQuery(query);
    }
    
    
    return(
       <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12 ">
            <div 
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <Image 
                    src="/icn_category_beach.jpeg"
                    alt="Category - Beach "
                    width={20}
                    height={20}
                />

                <span className="text-xs">All</span>
            </div>

            <div 
                onClick={() => _setCategory('Beach')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Beach' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <Image 
                    src="/icn_category_beach.jpeg"
                    alt="Category - Beach "
                    width={20}
                    height={20}
                />

                <span className="text-xs">Beach</span>
            </div>

            <div 
                onClick={() => _setCategory('Villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Villas' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <Image 
                    src="/icn_category_beach.jpeg"
                    alt="Category - Villas "
                    width={20}
                    height={20}
                />

                <span className="text-xs">Villas</span>
            </div>
            <div 
                onClick={() => _setCategory('Cabins')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Cabins' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <Image 
                    src="/icn_category_beach.jpeg"
                    alt="Category - Cabins "
                    width={20}
                    height={20}
                />

                <span className="text-xs">Cabins</span>
            </div>
            <div 
                onClick={() => _setCategory('Tiny homes')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Tiny homes' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <Image 
                    src="/icn_category_beach.jpeg"
                    alt="Category - Tiny homes "
                    width={20}
                    height={20}
                />

                <span className="text-xs">Tiny homes</span>
            </div>
       </div>
    )
}

export default Categories;