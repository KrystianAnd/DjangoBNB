'use client';

import {useState , useEffect} from 'react';
import {Range} from 'react-date-range';
import {differenceInDays, eachDayOfInterval , format} from 'date-fns';
import DatePicker from '../forms/Calendar';
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

    const [message, setMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [total_price, setTotal_price] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [guests, setGuests] = useState<string>('1');
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const guestsRange = Array.from({ length: property.guests}, (_, index) => index + 1)

    const performBooking = async () => {
        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nights.toString());
                formData.append('total_price', total_price.toString());
    
                try {
                    const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);
                    if (response.success) {
                        setMessage('Reservation successful!');
                        setIsSuccess(true);
                    } else {
                        setMessage('Reservation failed. Please try again.');
                        setIsSuccess(false);
                    }
                } catch (error) {
                    setMessage('An error occurred. Please try again later.');
                    setIsSuccess(false);
                }
            }
        } else {
            loginModal.open();
        }
    };
    
    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if( newEndDate <= newStartDate){
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate : newEndDate
        })
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

        let dates : Date[] = [];

        reservations.forEach((reservations: any) =>{
            const range = eachDayOfInterval({
                start : new Date(reservations.start_date),
                end: new Date(reservations.end_date)
            });
            dates = [... dates, ...range];
        })

        setBookedDates(dates);
    }

    useEffect(() => {
        getReservations();
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

            <DatePicker
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
            />

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
            <div 
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white bg-[#FF5A60] hover:bg-[#d50027] rounded-xl"
            >
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

            {message && (
                <div className={`mt-4 mb-4 p-3 rounded-xl ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <hr />
        </aside>
    )
}

export default ReservationSideBar;