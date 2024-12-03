import React, { useState } from "react";

type FlightBooking = {
    BookingId: number;
    CustomerName: string;
    Email: string;
    ContactNumber: string;
    BookingDate: string;
    PNRNumber: string;
    Airline: string;
    Route: string;
    Departure: string;
    Arrival: string;
    BaseFare: number;
    ServiceFee: number;
    TotalAmount: number;
};

const FlightBookingList: React.FC = () => {
    const [bookings, setBookings] = useState<FlightBooking[]>([
        {
            BookingId: 1937117,
            CustomerName: "Ashish Kumar",
            Email: "ask@gmail.com",
            ContactNumber: "6206739259",
            BookingDate: "2024-11-25T17:23:47",
            PNRNumber: "A52JWB",
            Airline: "IndiGo",
            Route: "DEL to BOM",
            Departure: "2024-11-28T15:00:00",
            Arrival: "2024-11-28T17:15:00",
            BaseFare: 4132,
            ServiceFee: 0,
            TotalAmount: 4132,
        },
    ]);

    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [editedValues, setEditedValues] = useState<Partial<FlightBooking>>({});
    const [searchFilters, setSearchFilters] = useState<Partial<FlightBooking>>({});

    const handleEditClick = (id: number): void => {
        setEditableRow(id);
        const currentBooking = bookings.find((booking) => booking.BookingId === id);
        if (currentBooking) {
            setEditedValues(currentBooking);
        }
    };

    const handleSaveClick = (id: number): void => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.BookingId === id ? { ...booking, ...editedValues } : booking
            )
        );
        setEditableRow(null);
        setEditedValues({});
    };

    const handleInputChange = (
        field: keyof FlightBooking,
        value: string | number
    ): void => {
        setEditedValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSearchChange = (field: keyof FlightBooking, value: string): void => {
        setSearchFilters((prev) => ({ ...prev, [field]: value }));
    };

    const filteredBookings = bookings.filter((booking) => {
        return Object.keys(searchFilters).every((key) => {
            const filterValue = searchFilters[key as keyof FlightBooking];
            if (!filterValue) return true;
            const bookingValue = String(booking[key as keyof FlightBooking]).toLowerCase();
            return bookingValue.includes(String(filterValue).toLowerCase());
        });
    });

    const fields = [
        "CustomerName",
        "Email",
        "ContactNumber",
        "BookingDate",
        "PNRNumber",
        "Airline",
        "Route",
        "Departure",
        "Arrival",
        "BaseFare",
        "ServiceFee",
        "TotalAmount",
    ] as const;

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h5 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800 dark:text-gray-100 mb-6">
                    Flight Booking List
                </h5>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    {fields.map((field) => (
                                        <th
                                            key={field}
                                            className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                                        >
                                            <div className="space-y-2">
                                                <div className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    {field}
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder={`Search ${field}`}
                                                    className="w-28 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                                    onChange={(e) =>
                                                        handleSearchChange(field, e.target.value)
                                                    }
                                                />
                                            </div>
                                        </th>
                                    ))}
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        <div className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Actions
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr
                                        key={booking.BookingId}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        {fields.map((field) => (
                                            <td
                                                key={field}
                                                className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm"
                                            >
                                                {editableRow === booking.BookingId ? (
                                                    <input
                                                        type={
                                                            ["BaseFare", "ServiceFee", "TotalAmount"].includes(
                                                                field
                                                            )
                                                                ? "number"
                                                                : "text"
                                                        }
                                                        value={editedValues[field] ?? booking[field]}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                field,
                                                                ["BaseFare", "ServiceFee", "TotalAmount"].includes(
                                                                    field
                                                                )
                                                                    ? parseInt(e.target.value)
                                                                    : e.target.value
                                                            )
                                                        }
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                                    />
                                                ) : (
                                                    <span className="block truncate max-w-xs">
                                                        {booking[field]}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            <div className="flex gap-2">
                                                {editableRow === booking.BookingId ? (
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                                                        onClick={() => handleSaveClick(booking.BookingId)}
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <>
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded text-sm"
                                                        onClick={() => handleEditClick(booking.BookingId)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded text-sm"
                                                    >
                                                        View
                                                    </button>
                                                    </>
                                                    
                                                    
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
{/* Mobile Card View */}
<div className="lg:hidden space-y-4">
    {/* Mobile Search Bar */}
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
        <h5 className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-3">
            Search Bookings
        </h5>
        {fields.map((field) => (
            <div key={field} className="mb-3">
                <label
                    htmlFor={`search-${field}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {field}
                </label>
                <input
                    id={`search-${field}`}
                    type="text"
                    placeholder={`Search ${field}`}
                    className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    onChange={(e) => handleSearchChange(field, e.target.value)}
                />
            </div>
        ))}
    </div>

    {filteredBookings.map((booking) => (
        <div
            key={booking.BookingId}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4"
        >
            {fields.map((field) => (
                <div
                    key={field}
                    className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0"
                >
                    <span className="font-medium text-sm text-gray-600 dark:text-gray-300 mb-1 sm:mb-0">
                        {field}
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                        {editableRow === booking.BookingId ? (
                            <input
                                type={
                                    ["BaseFare", "ServiceFee", "TotalAmount"].includes(field)
                                        ? "number"
                                        : "text"
                                }
                                value={editedValues[field] ?? booking[field]}
                                onChange={(e) =>
                                    handleInputChange(
                                        field,
                                        ["BaseFare", "ServiceFee", "TotalAmount"].includes(field)
                                            ? parseInt(e.target.value)
                                            : e.target.value
                                    )
                                }
                                className="w-full sm:w-48 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                            />
                        ) : (
                            <span className="break-words">{booking[field]}</span>
                        )}
                    </span>
                </div>
            ))}
            <div className="mt-4 flex gap-2">
                {editableRow === booking.BookingId ? (
                    <button
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                        onClick={() => handleSaveClick(booking.BookingId)}
                    >
                        Save
                    </button>
                ) : (
                    <>
                        <button
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                            onClick={() => handleEditClick(booking.BookingId)}
                        >
                            Edit
                        </button>
                        <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">
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

export default FlightBookingList;
