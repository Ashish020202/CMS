import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

type Booking = {
    VoucherStatus: boolean;
    ResponseStatus: number;
    TraceId: string;
    Status: number;
    HotelName:string;
    HotelCode:string;
    GuestNationality:string;
    NoOfRooms:number;
    Dates:string;
    CurrenyCode:string;
    HotelBookingStatus: string;
    InvoiceNumber: string;
    ConfirmationNo: string;
    BookingRefNo: string;
    BookingId: number;
    IsPriceChanged: boolean;
    IsCancellationPolicyChanged: boolean;
    createdAt: string;
    Price:number;
    PriceAfterCommission:number;
};

const HotelBookingList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editedValues, setEditedValues] = useState<Partial<Booking>>({});
    const [searchFilters, setSearchFilters] = useState<Partial<Booking>>({});
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/response');
            setBookings(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch bookings. Please try again later.');
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleEditClick = (id: number): void => {
        setEditableRow(id);
        const currentBooking = bookings.find((booking) => booking.BookingId === id);
        if (currentBooking) {
            setEditedValues(currentBooking);
        }
    };

    // const handleSaveClick = (id: number): void => {
    //     setBookings((prevBookings) =>
    //         prevBookings.map((booking) =>
    //             booking.BookingId === id ? { ...booking, ...editedValues } : booking
    //         )
    //     );
    //     setEditableRow(null);
    //     setEditedValues({});
    // };

    const handleSaveClick = async (id: number): Promise<void> => {
        try {
            // Add API call to update booking
            await axios.put(`http://localhost:5000/api/response/${id}`, editedValues);
            
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.BookingId === id ? { ...booking, ...editedValues } : booking
                )
            );
            setEditableRow(null);
            setEditedValues({});
            
            // Refresh bookings after update
            fetchBookings();
        } catch (err) {
            console.error('Error updating booking:', err);
            setError('Failed to update booking. Please try again.');
        }
    };


    const handleInputChange = (
        field: keyof Booking,
        value: string | boolean | number
    ): void => {
        setEditedValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSearchChange = (field: keyof Booking, value: string): void => {
        setSearchFilters((prev) => ({ ...prev, [field]: value }));
    };

    const filteredBookings = bookings.filter((booking) => {
        return Object.keys(searchFilters).every((key) => {
            const filterValue = searchFilters[key as keyof Booking];
            if (!filterValue) return true;
            const bookingValue = String(booking[key as keyof Booking]).toLowerCase();
            return bookingValue.includes(String(filterValue).toLowerCase());
        });
    });

    // Mobile card view for each booking
    const BookingCard = ({ booking }: { booking: Booking }) => {
        const isExpanded = expandedRow === booking.BookingId;
        const isEditing = editableRow === booking.BookingId;

        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between items-center">
                    <div className="font-semibold">#{booking.BookingId}</div>
                    <button
                        onClick={() => setExpandedRow(isExpanded ? null : booking.BookingId)}
                        className="text-blue-500"
                    >
                        {isExpanded ? "Less" : "More"}
                    </button>
                </div>
                <div className="mt-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-600 dark:text-gray-400">Status:</div>
                        <div>
                            {isEditing ? (
                                <input
                                    className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                    type="text"
                                    value={editedValues.HotelBookingStatus || booking.HotelBookingStatus}
                                    onChange={(e) => handleInputChange("HotelBookingStatus", e.target.value)}
                                />
                            ) : booking.HotelBookingStatus}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Invoice:</div>
                        <div>
                            {isEditing ? (
                                <input
                                    className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                    type="text"
                                    value={editedValues.InvoiceNumber || booking.InvoiceNumber}
                                    onChange={(e) => handleInputChange("InvoiceNumber", e.target.value)}
                                />
                            ) : booking.InvoiceNumber}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Price:</div>
                        <div>
                            {isEditing ? (
                                <input
                                    className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                    type="number"
                                    value={editedValues.Price || booking.Price}
                                    onChange={(e) => handleInputChange("Price", parseInt(e.target.value))}
                                />
                            ) : booking.Price}
                        </div>
                    </div>
                    
                    {isExpanded && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="text-gray-600 dark:text-gray-400">Voucher Status:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        type="checkbox"
                                        checked={Boolean(editedValues.VoucherStatus ?? booking.VoucherStatus)}
                                        onChange={(e) => handleInputChange("VoucherStatus", e.target.checked)}
                                    />
                                ) : (booking.VoucherStatus ? "True" : "False")}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Response Status:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                        type="number"
                                        value={editedValues.ResponseStatus || booking.ResponseStatus}
                                        onChange={(e) => handleInputChange("ResponseStatus", parseInt(e.target.value))}
                                    />
                                ) : booking.ResponseStatus}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Trace ID:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                        type="text"
                                        value={editedValues.TraceId || booking.TraceId}
                                        onChange={(e) => handleInputChange("TraceId", e.target.value)}
                                    />
                                ) : booking.TraceId}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Confirmation:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                        type="text"
                                        value={editedValues.ConfirmationNo || booking.ConfirmationNo}
                                        onChange={(e) => handleInputChange("ConfirmationNo", e.target.value)}
                                    />
                                ) : booking.ConfirmationNo}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Booking Ref:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                        type="text"
                                        value={editedValues.BookingRefNo || booking.BookingRefNo}
                                        onChange={(e) => handleInputChange("BookingRefNo", e.target.value)}
                                    />
                                ) : booking.BookingRefNo}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Price:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                        type="text"
                                        value={editedValues.Price || booking.Price}
                                        onChange={(e) => handleInputChange("BookingRefNo", e.target.value)}
                                    />
                                ) : booking.Price}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Price After Commission:</div>
                            <div>
                                {isEditing ? (
                                    <input
                                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                        type="number"
                                        value={editedValues.PriceAfterCommission || booking.PriceAfterCommission}
                                        onChange={(e) => handleInputChange("PriceAfterCommission", parseInt(e.target.value))}
                                    />
                                ) : booking.PriceAfterCommission}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4 flex gap-2">
                    {isEditing ? (
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded w-full"
                            onClick={() => handleSaveClick(booking.BookingId)}
                        >
                            Save
                        </button>
                    ) : (
                        <>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded flex-1"
                                onClick={() => handleEditClick(booking.BookingId)}
                            >
                                Edit
                            </button>
                            <button className="bg-gray-500 text-white px-3 py-1 rounded flex-1">
                                View Details
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };


    return (
        <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 rounded shadow-md">
            <h5 className="font-semibold text-xl text-gray-800 dark:text-gray-100 mb-4">
                Hotel Booking List
            </h5>
            
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            {[  
                                "Voucher Status",
                                "Response Status",
                                "Trace ID",
                                "Status",
                                "Hotel Booking Status",
                                "Invoice Number",
                                "Confirmation No",
                                "Booking Ref No",
                                "Price",
                                "PriceAfterCommission",
                                "Actions"
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300 whitespace-nowrap"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                            {Object.keys(bookings[0] ?? {})
                                .slice(0, -3)
                                .map((key) => (
                                    <th key={key} className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        <input
                                            type="text"
                                            placeholder={`Search ${key}`}
                                            className="w-24 px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            onChange={(e) =>
                                                handleSearchChange(
                                                    key as keyof Booking,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </th>
                                ))}
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.BookingId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {editableRow === booking.BookingId ? (
                                        <input
                                            type="checkbox"
                                            checked={Boolean(editedValues.VoucherStatus)}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "VoucherStatus",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    ) : booking.VoucherStatus ? "True" : "False"}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="number"
                                            value={
                                                editedValues.ResponseStatus ||
                                                booking.ResponseStatus
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "ResponseStatus",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.ResponseStatus
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="text"
                                            value={
                                                editedValues.TraceId ||
                                                booking.TraceId
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "InvoiceNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.TraceId
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="number"
                                            value={editedValues.Status || booking.Status}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "Status",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.Status
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="text"
                                            value={
                                                editedValues.HotelBookingStatus ||
                                                booking.HotelBookingStatus
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "InvoiceNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.HotelBookingStatus
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="text"
                                            value={
                                                editedValues.InvoiceNumber ||
                                                booking.InvoiceNumber
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "InvoiceNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.InvoiceNumber
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="text"
                                            value={
                                                editedValues.ConfirmationNo ||
                                                booking.ConfirmationNo
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "InvoiceNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.ConfirmationNo
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="text"
                                            value={
                                                editedValues.BookingRefNo ||
                                                booking.BookingRefNo
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "InvoiceNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.BookingRefNo
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="number"
                                            value={
                                                editedValues.Price ||
                                                booking.Price
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "ResponseStatus",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.Price
                                    )}
                                </td>

                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {editableRow === booking.BookingId ? (
                                        <input
                                            className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            type="number"
                                            value={
                                                editedValues.PriceAfterCommission ||
                                                booking.PriceAfterCommission
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "ResponseStatus",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    ) : (
                                        booking.PriceAfterCommission
                                    )}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <div className="flex gap-2">
                                        {editableRow === booking.BookingId ? (
                                            <button
                                                className="bg-green-500 text-white px-5 py-3 rounded"
                                                onClick={() => handleSaveClick(booking.BookingId)}
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                    onClick={() =>
                                                        handleEditClick(booking.BookingId)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button className="bg-gray-500 text-white px-3 py-1 rounded">
                                                    View Details
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

            {/* Mobile View */}
            <div className="lg:hidden space-y-4">
                {filteredBookings.map((booking) => (
                    <BookingCard key={booking.BookingId} booking={booking} />
                ))}
            </div>
        </div>
    );
};

export default HotelBookingList;