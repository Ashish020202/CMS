import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
    Save, 
    Edit, 
    User, 
    Hotel, 
    MapPin, 
    Phone, 
    Mail, 
    CreditCard, 
    Calendar 
} from "lucide-react";

type HotelBooking = {
    id: number;
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

const HotelbookingEdit: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state as HotelBooking;

    const [formData, setFormData] = useState(booking);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation function
    const validateField = (name: string, value: string) => {
        switch (name) {
            case "ContactEmail":
                return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
                    ? "" 
                    : "Invalid email address";
            case "NoOfRooms":
                return parseInt(value) > 0 
                    ? "" 
                    : "Number of rooms must be at least 1";
            case "GuestNationality":
                return value.trim().length > 1 
                    ? "" 
                    : "Nationality must be at least 2 characters";
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
            if (["ContactEmail", "NoOfRooms", "GuestNationality"].includes(key)) {
                const errorMessage = validateField(key, formData[key as keyof HotelBooking] as string);
                if (errorMessage) {
                    newErrors[key] = errorMessage;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Updated Hotel Booking Details:", formData);

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
        type = "text"
    }: {
        icon: React.ElementType;
        label: string;
        name: string;
        value: string | number;
        readOnly?: boolean;
        type?: string;
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
                    type={type}
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
                        <h2 className="text-2xl font-bold">Edit Hotel Booking Details</h2>
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
                        icon={Hotel}
                        label="Hotel Name"
                        name="HotelName"
                        value={`${formData.HotelName} (${formData.HotelCode})`}
                        readOnly
                    />
                    <EditableInput
                        icon={User}
                        label="Guest Nationality"
                        name="GuestNationality"
                        value={formData.GuestNationality}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={MapPin}
                        label="Booking Reference"
                        name="BookingRefNo"
                        value={formData.BookingRefNo}
                        readOnly
                    />
                    <EditableInput
                        icon={Calendar}
                        label="Booking Dates"
                        name="Dates"
                        value={formData.Dates}
                        readOnly
                    />
                    <EditableInput
                        icon={CreditCard}
                        label="Number of Rooms"
                        name="NoOfRooms"
                        value={formData.NoOfRooms}
                        readOnly={!isEditing}
                        type="number"
                    />
                    <EditableInput
                        icon={Mail}
                        label="Contact Email"
                        name="ContactEmail"
                        value={formData.ContactEmail || ""}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={CreditCard}
                        label="Total Price"
                        name="Price"
                        value={`$${formData.Price}`}
                        readOnly
                    />
                    <EditableInput
                        icon={CreditCard}
                        label="Price After Commission"
                        name="PriceAfterCommission"
                        value={`$${formData.PriceAfterCommission}`}
                        readOnly
                    />
                    <EditableInput
                        icon={Hotel}
                        label="Booking Status"
                        name="HotelBookingStatus"
                        value={formData.HotelBookingStatus}
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

export default HotelbookingEdit;