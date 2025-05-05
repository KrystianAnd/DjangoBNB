import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";

const MyReservationsPage = async () => {
    const reservations = await apiService.get('/api/auth/myreservations/');
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My Reservations</h1>
            <div className="space-y-4">
                {reservations.map((reservations: any) => {
                    return(
                        <div 
                            key={reservations.id}
                            className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
                        >
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl ">
                                    <Image 
                                        fill
                                        src={reservations.property.image_url}
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                        alt="Beach House"
                                    />
                                </div>
                            </div>
                                                    
                            <div className="col-span-1 md:col-span-3  ">
                                <h2 className="mb-4 text-xl ">{reservations.property.title}</h2>
                                <p className="mb-2"><strong>Check in date: </strong> {reservations.start_date}</p>
                                <p className="mb-2"><strong>Check out date: </strong> {reservations.end_date} </p>
                                <p className="mb-2"><strong>Number of nights: </strong> {reservations.number_of_nights}</p>
                                <p className="mb-2"><strong>Total price: </strong> {reservations.total_price} $</p>

                                <Link 
                                    href={`/properties/${reservations.property.id}`}
                                    className="coursor-pointer mt-4 inline-block py-4 px-6 bg-[#FF5A60] text-white rounded-xl hover:bg-[#d50027] transition "
                                >
                                    Go to Property
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default MyReservationsPage;