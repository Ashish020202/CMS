import React from "react";
import { useLocation } from "react-router-dom";
import { Hotel, MapPin, User, Phone, Mail, CreditCard, Calendar, Bookmark } from "lucide-react";

type HotelBooking = {
    id: number;
    bookingId: number;
    HotelName: string;
    HotelCode: string;
    GuestNationality: string;
    NoOfRooms: number;
    Dates: string;
    HotelBookingStatus: string;
    InvoiceNumber: string;
    ConfirmationNo: string;
    BookingRefNo: string;
    Price: number;
    PriceAfterCommission: number;
    ContactEmail?: string;
};

const HotelBookingDetails: React.FC = () => {
    const location = useLocation();
    const booking = location.state as HotelBooking;


    const BookingDetailRow = ({ 
        icon: Icon, 
        label, 
        value 
    }: { 
        icon: React.ElementType, 
        label: string, 
        value: string | number 
    }) => (
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
                    {label}
                </span>
            </div>
            <span className="text-gray-900 dark:text-gray-100 font-semibold">
                {value}
            </span>
        </div>
    );

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
               
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Booking Detail</h2>
                        <div className="flex items-center space-x-2">
                            <Hotel className="w-6 h-6" />
                            <span className="font-semibold">{booking.BookingRefNo}</span>
                        </div>
                    </div>
                </div>

              
                <div className="p-6">
                    <BookingDetailRow 
                        icon={Hotel} 
                        label="Hotel Name" 
                        value={`${booking.HotelName} (${booking.HotelCode})`} 
                    />
                    <BookingDetailRow 
                        icon={User} 
                        label="Guest Nationality" 
                        value={booking.GuestNationality} 
                    />
                    <BookingDetailRow 
                        icon={MapPin} 
                        label="Booking Reference" 
                        value={booking.BookingRefNo} 
                    />
                    <BookingDetailRow 
                        icon={Calendar} 
                        label="Dates" 
                        value={booking.Dates} 
                    />
                    <BookingDetailRow 
                        icon={Bookmark} 
                        label="Booking Status" 
                        value={booking.HotelBookingStatus} 
                    />
                    <BookingDetailRow 
                        icon={CreditCard} 
                        label="Total Price" 
                        value={`${booking.Price}`} 
                    />
                    <BookingDetailRow 
                        icon={CreditCard} 
                        label="Price After Commission" 
                        value={`${booking.PriceAfterCommission}`} 
                    />
                    <BookingDetailRow 
                        icon={Phone} 
                        label="Number of Rooms" 
                        value={booking.NoOfRooms} 
                    />
                    <BookingDetailRow 
                        icon={Mail} 
                        label="Invoice Number" 
                        value={booking.InvoiceNumber} 
                    />
                    <BookingDetailRow 
                        icon={Bookmark} 
                        label="Confirmation Number" 
                        value={booking.ConfirmationNo} 
                    />
                </div>
            </div>
        </div>
    );
};

export default HotelBookingDetails;