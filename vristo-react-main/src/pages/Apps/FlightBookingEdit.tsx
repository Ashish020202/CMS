import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
    Save, 
    Edit, 
    User, 
    Plane, 
    MapPin, 
    Phone, 
    Mail, 
    CreditCard, 
    Calendar, 
    Clock 
} from "lucide-react";

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

const EditBookingDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state as FlightBooking;

    const [formData, setFormData] = useState(booking);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation function
    const validateField = (name: string, value: string) => {
        switch (name) {
            case "email":
                return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
                    ? "" 
                    : "Invalid email address";
            case "contactNo":
                return value.match(/^[0-9]{10}$/) 
                    ? "" 
                    : "Phone number must be 10 digits";
            case "passengerName":
                return value.trim().length > 2 
                    ? "" 
                    : "Name must be at least 3 characters";
            default:
                return "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate the field
        const errorMessage = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage,
        }));

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach((key) => {
            if (["email", "contactNo", "passengerName"].includes(key)) {
                const errorMessage = validateField(key, formData[key as keyof FlightBooking] as string);
                if (errorMessage) {
                    newErrors[key] = errorMessage;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Updated Booking Details:", formData);

        // Save and exit edit mode
        setIsEditing(false);
    };

    // Custom input component for consistent styling
    const EditableInput = ({
        icon: Icon,
        label,
        name,
        value,
        readOnly,
    }: {
        icon: React.ElementType;
        label: string;
        name: string;
        value: string | number;
        readOnly?: boolean;
    }) => (
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <label htmlFor={name} className="text-gray-600 dark:text-gray-300 capitalize font-medium">
                    {label}
                </label>
            </div>
            <div>
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    readOnly={readOnly}
                    className={`
                        w-full px-3 py-2 border rounded-lg 
                        dark:bg-gray-600 dark:text-white 
                        focus:outline-none focus:ring focus:border-blue-500
                        ${readOnly ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}
                        ${errors[name] ? "border-red-500" : ""}
                    `}
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
        </div>
    );

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Edit Booking Details</h2>
                        <button
                            onClick={handleEditToggle}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                            <Edit className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <EditableInput
                        icon={User}
                        label="Passenger Name"
                        name="passengerName"
                        value={formData.passengerName}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={Plane}
                        label="Airline"
                        name="airlineName"
                        value={`${formData.airlineName} - ${formData.flightNumber}`}
                        readOnly
                    />
                    <EditableInput
                        icon={MapPin}
                        label="Route"
                        name="route"
                        value={`${formData.origin} → ${formData.destination}`}
                        readOnly
                    />
                    <EditableInput
                        icon={Calendar}
                        label="Departure Time"
                        name="departureTime"
                        value={formData.departureTime}
                        readOnly
                    />
                    <EditableInput
                        icon={Clock}
                        label="Arrival Time"
                        name="arrivalTime"
                        value={formData.arrivalTime}
                        readOnly
                    />
                    <EditableInput
                        icon={Phone}
                        label="Contact Number"
                        name="contactNo"
                        value={formData.contactNo}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={Mail}
                        label="Email"
                        name="email"
                        value={formData.email}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={CreditCard}
                        label="Total Fare"
                        name="totalFare"
                        value={`$${formData.totalFare.toFixed(2)}`}
                        readOnly
                    />
                    <EditableInput
                        icon={Plane}
                        label="Booking ID"
                        name="bookingId"
                        value={formData.bookingId}
                        readOnly
                    />

                    {isEditing && (
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition duration-300"
                            >
                                <Save className="mr-2 w-5 h-5" />
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditBookingDetails;
