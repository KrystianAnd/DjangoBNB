'use client';

import {useState , useEffect} from 'react';
import {Range} from 'react-date-range';
import {differenceInDays, eachDayOfInterval} from 'date-fns';


import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property = {
    id : string;
    guests : number;
    price_per_night : number;
}

interface ReservationSideBarProps {
    userId: string | null, 
    property: Property
}
const ReservationSideBar: React.FC<ReservationSideBarProps> = ({
    property,
    userId
}) => {
    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] =useState<number>(1);
    const [total_price, setTotal_price] =useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [guests, setGuests] = useState<string>('1');
    const guestsRange = Array.from({ length: property.guests}, (_, index) => index + 1)

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays(
                dateRange.endDate, 
                dateRange.startDate
            );

            if (dayCount && property.price_per_night){
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotal_price((dayCount * property.price_per_night) + _fee);
                setNights(dayCount);
            }else {
                const _fee = (property.price_per_night / 100) * 5; 

                setFee(_fee)
                setTotal_price(property.price_per_night + _fee)
                setNights(1)
            }
        }
    }, [dateRange])

    return(
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl ">
            <h2 className="mb-5 text-2xl ">${property.price_per_night} per night</h2>

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="mb-2 block font-bold text-xs">Guests</label>

                <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full -ml-1 text-xm"
                >
                    {guestsRange.map(number =>(
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>
            <div className="w-full mb-6 py-6 text-center text-white bg-[#FF5A60] hover:bg-[#d50027] rounded-xl">
                book
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p> ${property.price_per_night} * {nights} nights</p>

                <p>${property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center ">
                <p> DjangoBNB fee</p>

                <p>${fee}</p>
            </div>

            <div className="mb-4 flex justify-between align-center font-bold">
                <p> Total</p>

                <p>${total_price}</p>
            </div>

            <hr />
        </aside>
    )
}

export default ReservationSideBar;