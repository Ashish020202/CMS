import React, { useState } from 'react';

const CommissionSettings = () => {
    // State to track if fields are editable
    const [isEditing, setIsEditing] = useState(false);

    // State to hold commission percentages
    const [flightCommission, setFlightCommission] = useState<number>(10); // Example initial value
    const [hotelCommission, setHotelCommission] = useState<number>(15); // Example initial value

    // Trigger when edit is clicked
    const handleEditClick = () => {
        setIsEditing(true); // Enables editing mode
    };

    // Handle form submission
    const handleSaveClick = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to save updated commissions, like making an API call or updating backend here
        console.log("Updated Flight Commission:", flightCommission + "%");
        console.log("Updated Hotel Commission:", hotelCommission + "%");

        setIsEditing(false); // Disable editing mode after submitting
    };

    return (
        <div className="panel">
            <h5 className="font-semibold text-lg dark:text-white-light">Commission Settings</h5>
            <form onSubmit={handleSaveClick} className="mb-5">
                
                {/* Flight Commission Input */}
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Flight Commission (%)</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            className="form-input flex-grow"
                            // value={flightCommission}
                            onChange={(e) => setFlightCommission(Number(e.target.value))}
                            disabled={!isEditing} // Only editable when isEditing is true
                            required
                        />
                        <span className="ml-2">%</span>
                    </div>
                </div>

                {/* Hotel Commission Input */}
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Hotel Commission (%)</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            className="form-input flex-grow"
                            // value={hotelCommission}
                            onChange={(e) => setHotelCommission(Number(e.target.value))}
                            disabled={!isEditing} // Only editable when isEditing is true
                            required
                        />
                        <span className="ml-2">%</span>
                    </div>
                </div>

               
                {!isEditing ? (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleEditClick} // Switch to edit mode
                    >
                        Edit
                    </button>
                ) : (
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
};

export default CommissionSettings;
