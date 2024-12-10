import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    Save, 
    Edit, 
    User, 
    Mail, 
    Phone, 
    Calendar 
} from "lucide-react";

type UserBooking = {
    bookingId: number;
    name: string;
    email: string;
    contact: string;
    bookingStatus: string;
};

const UserDetailEdit: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state as UserBooking;

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
            case "contact":
                return value.match(/^[+]?[\d\s()-]{10,}$/) 
                    ? "" 
                    : "Invalid contact number";
            case "name":
                return value.trim().length >= 2 
                    ? "" 
                    : "Name must be at least 2 characters";
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach((key) => {
            if (["name", "email", "contact"].includes(key)) {
                const errorMessage = validateField(key, formData[key as keyof UserBooking] as string);
                if (errorMessage) {
                    newErrors[key] = errorMessage;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        
        try {
            const response = await axios.patch(`http://localhost:5000/api/updatedusers`, {
                email: formData.email, 
                bookingStatus: formData.bookingStatus
            });

            
            console.log("Updated User Booking Details:", response.data);

            
            setIsEditing(false);
            
           
        } catch (error) {
            console.error("Error updating booking status:", error);
            // Handle error - show error message to user
            alert("Failed to update booking status. Please try again.");
        } 
    };


   
    const EditableInput = ({
        icon: Icon,
        label,
        name,
        value,
        readOnly,
        type = "text",
        options = []
    }: {
        icon: React.ElementType;
        label: string;
        name: string;
        value: string | number;
        readOnly?: boolean;
        type?: string;
        options?: string[];
    }) => (
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <label htmlFor={name} className="text-gray-600 dark:text-gray-300 capitalize font-medium">
                    {label}
                </label>
            </div>
            <div>
                {name === "bookingStatus" && !readOnly ? (
                    <select
                        id={name}   
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        readOnly={readOnly}
                        className={`w-full px-3 py-2 border rounded-lg 
                            dark:bg-gray-600 dark:text-white 
                            focus:outline-none focus:ring focus:border-blue-500
                            ${readOnly ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}
                            ${errors[name] ? "border-red-500" : ""}
                        `}
                    />
                )}
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
                        <h2 className="text-2xl font-bold">Edit User Booking Details</h2>
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
                    {/* <EditableInput
                        icon={User}
                        label="Booking ID"
                        name="bookingId"
                        value={formData.bookingId}
                        readOnly
                    /> */}
                    {/* <EditableInput
                        icon={User}
                        label="Name"
                        name="name"
                        value={formData.name}
                        readOnly={!isEditing}
                    /> */}
                    <EditableInput
                        icon={Mail}
                        label="Email"
                        name="email"
                        value={formData.email}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={Phone}
                        label="Contact"
                        name="contact"
                        value={formData.contact}
                        readOnly={!isEditing}
                    />
                    <EditableInput
                        icon={Calendar}
                        label="Booking Status"
                        name="bookingStatus"
                        value={formData.bookingStatus}
                        readOnly={!isEditing}
                        options={["Active", "Inactive"]}
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

export default UserDetailEdit;