import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Search, X } from "lucide-react";

type UserBooking = {
    Actions: string;
    bookingId: number;
    name: string;
    email: string;
    password: string;
    contact: string;
    bookingStatus: string;
};

const UserDetailList: React.FC = () => {
    const [bookings, setBookings] = useState<UserBooking[]>([]);
    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [editedValues, setEditedValues] = useState<Partial<UserBooking>>({});
    const [searchFilters, setSearchFilters] = useState<Partial<UserBooking>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserBookings();
    }, []);

    const fetchUserBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch user bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (id: number): void => {
        setEditableRow(id);
        const currentBooking = bookings.find((booking) => booking.bookingId === id);
        if (currentBooking) {
            setEditedValues(currentBooking);
        }
    };
    
    const handleEdit = (booking: UserBooking): void => {
        navigate(`/userDetail-edit/${booking.bookingId}`, { state: booking });
    };
    
    const handleViewClick = (booking: UserBooking): void => {
        navigate(`/user-detail/${booking.bookingId}`, { state: booking });
    };

    const handleSaveClick = (id: number): void => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.bookingId === id ? { ...booking, ...editedValues } : booking
            )
        );
        setEditableRow(null);
        setEditedValues({});
    };

    const handleInputChange = (
        field: keyof UserBooking,
        value: string
    ): void => {
        setEditedValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSearchChange = (field: keyof UserBooking, value: string): void => {
        setSearchFilters((prev) => ({ ...prev, [field]: value }));
    };

    const clearSearchFilter = (field: keyof UserBooking): void => {
        setSearchFilters((prev) => {
            const newFilters = { ...prev };
            delete newFilters[field];
            return newFilters;
        });
    };

    const filteredBookings = bookings.filter((booking) => {
        return Object.keys(searchFilters).every((key) => {
            const filterValue = searchFilters[key as keyof UserBooking];
            if (!filterValue) return true;
            const bookingValue = String(booking[key as keyof UserBooking]).toLowerCase();
            return bookingValue.includes(String(filterValue).toLowerCase());
        });
    });

    const fields: (keyof UserBooking)[] = [
        "Actions",
        // "bookingId",
        // "name", 
        "email", 
        "password", 
        "contact", 
        "bookingStatus"
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 animate-pulse">
                    Loading User Bookings...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-lg font-bold text-red-600 dark:text-red-400 bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-8 bg-gradient-to-br from-white to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-2xl">
                            <thead className="bg-gradient-to-r from-blue-500 to-purple-500">
                                <tr>
                                    {fields.map((field) => (
                                        <th
                                            key={field}
                                            className="px-6 py-4 text-left text-sm font-bold bg-black-light text-gray-500 uppercase tracking-wider border-b-2 border-black align-center"
                                        >
                                            {field === "Actions" ? field : (
                                                <div className="space-y-2">
                                                    <span>{field}</span>
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <input
                                                            type="text"
                                                            placeholder={`Search ${field}`}
                                                            className="pl-8 w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                                            onChange={(e) =>
                                                                handleSearchChange(field, e.target.value)
                                                            }
                                                        />
                                                        {searchFilters[field] && (
                                                            <button 
                                                                onClick={() => clearSearchFilter(field)}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                                {filteredBookings.map((booking) => (
                                    <tr 
                                        key={booking.bookingId} 
                                        className="hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                {editableRow === booking.bookingId ? (
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                                                        onClick={() => handleSaveClick(booking.bookingId)}
                                                    >
                                                        Save Changes
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEdit(booking)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                                                        >
                                                            <Edit className="w-5 h-5" /> 
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewClick(booking)}
                                                            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                                                        >
                                                            <Eye className="w-5 h-5" /> 
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        {fields.slice(1).map((field) => (
                                            <td
                                                key={field}
                                                className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200"
                                            >
                                                {editableRow === booking.bookingId ? (
                                                    <input
                                                        type={field === "password" ? "password" : "text"}
                                                        value={editedValues[field] ?? booking[field]}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                field,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                                                    />
                                                ) : (
                                                    <span className="font-medium truncate max-w-xs block">
                                                        {field === "password" ? "********" : booking[field]}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-6">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.bookingId}
                            className="bg-white dark:bg-gray-700 rounded-xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-[1.02]"
                        >
                            {fields.slice(1).map((field) => (
                                <div
                                    key={field}
                                    className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600 last:border-0"
                                >
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        {field}
                                    </span>
                                    <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                                        {editableRow === booking.bookingId ? (
                                            <input
                                                type={field === "password" ? "password" : "text"}
                                                value={editedValues[field] ?? booking[field]}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        field,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                                            />
                                        ) : (
                                            <span className="break-words">
                                                {field === "password" ? "********" : booking[field]}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                            <div className="mt-6 flex space-x-4">
                                {editableRow === booking.bookingId ? (
                                    <button
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                                        onClick={() => handleSaveClick(booking.bookingId)}
                                    >
                                        Save Changes
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                                            onClick={() => handleEdit(booking)}
                                        >
                                            Edit Booking
                                        </button>
                                        <button 
                                            onClick={() => handleViewClick(booking)}
                                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                                        >
                                            View Details
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDetailList;