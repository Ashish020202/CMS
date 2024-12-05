import React from "react";
import { useLocation } from "react-router-dom";
import { Plane, MapPin, Clock, User, Phone, Mail, CreditCard, Calendar } from "lucide-react";

type FlightBooking = {
    bookingId: number;
    pnr: string;
    airlineName: string;
    flightNumber: string;
    origin: string;
    destination: string;
    passengerName: string;
    contactNo: string;
    email: string;
    totalFare: number;
    departureTime: string;
    arrivalTime: string;
};

const FlightBookingDetails: React.FC = () => {
    const location = useLocation();
    const booking = location.state as FlightBooking;

    // Helper function to render booking detail row
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
                {/* Header */}
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Booking Detail</h2>
                        <div className="flex items-center space-x-2">
                            <Plane className="w-6 h-6" />
                            <span className="font-semibold">{booking.pnr}</span>
                        </div>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="p-6">
                    <BookingDetailRow 
                        icon={User} 
                        label="Passenger Name" 
                        value={booking.passengerName} 
                    />
                    <BookingDetailRow 
                        icon={Plane} 
                        label="Airline" 
                        value={`${booking.airlineName} - ${booking.flightNumber}`} 
                    />
                    <BookingDetailRow 
                        icon={MapPin} 
                        label="Route" 
                        value={`${booking.origin} → ${booking.destination}`} 
                    />
                    <BookingDetailRow 
                        icon={Calendar} 
                        label="Departure Time" 
                        value={booking.departureTime} 
                    />
                    <BookingDetailRow 
                        icon={Clock} 
                        label="Arrival Time" 
                        value={booking.arrivalTime} 
                    />
                    <BookingDetailRow 
                        icon={Phone} 
                        label="Contact Number" 
                        value={booking.contactNo} 
                    />
                    <BookingDetailRow 
                        icon={Mail} 
                        label="Email" 
                        value={booking.email} 
                    />
                    <BookingDetailRow 
                        icon={CreditCard} 
                        label="Total Fare" 
                        value={`$${booking.totalFare.toFixed(2)}`} 
                    />
                </div>
            </div>
        </div>
    );
};

export default FlightBookingDetails;