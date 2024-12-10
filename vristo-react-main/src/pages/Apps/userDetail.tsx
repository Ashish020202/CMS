import React from "react";
import { useLocation } from "react-router-dom";
import { User, Phone, Mail, MapPin, Bookmark, Calendar } from "lucide-react";

type UserBooking = {
    bookingId: number;
    name: string;
    email: string;
    password:string;
    contact: string;
    bookingStatus: string;
};

const UserDetails: React.FC = () => {
    const location = useLocation();
    const booking = location.state as UserBooking;

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
                            <User className="w-6 h-6" />
                            <span className="font-semibold">{booking.bookingId}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* <BookingDetailRow 
                        icon={User} 
                        label="Booking ID" 
                        value={booking.bookingId} 
                    />
                    <BookingDetailRow 
                        icon={User} 
                        label="Name" 
                        value={booking.name} 
                    /> */}
                    <BookingDetailRow 
                        icon={Mail} 
                        label="Email" 
                        value={booking.email} 
                    />
                    <BookingDetailRow 
                        icon={User} 
                        label="Password" 
                        value={booking.password} 
                    /> 
                    <BookingDetailRow 
                        icon={Phone} 
                        label="Contact" 
                        value={booking.contact} 
                    />
                    <BookingDetailRow 
                        icon={Bookmark} 
                        label="Booking Status" 
                        value={booking.bookingStatus} 
                    />
                </div>
            </div>
        </div>
    );
};

export default UserDetails;