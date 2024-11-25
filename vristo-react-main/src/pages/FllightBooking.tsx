import React, { useState } from 'react';

const FllightBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNo: 'XXXX XXXX XXXX XXXX',
    expiryMonth: '08',
    expiryYear: '2024',
    cvv: '123',
    cardHolderName: 'Carolyn Ortiz',
  });

  const [travelerData, setTravelerData] = useState({
    name: 'Carolyn Ortiz',
    ageGroup: 'Adult',
    gender: 'Female',
    dob: 'Dec-2-1990',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTravelerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, travelerData);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Booking Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block font-semibold">Card Number</label>
          <input
            type="text"
            name="cardNo"
            value={formData.cardNo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            maxLength={16}
          />
        </div>

        {/* Expiration */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-semibold">Expiration Month</label>
            <input
              type="text"
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              maxLength={2}
            />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold">Expiration Year</label>
            <input
              type="text"
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              maxLength={4}
            />
          </div>
        </div>

        {/* CVV */}
        <div>
          <label className="block font-semibold">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            maxLength={3}
          />
        </div>

        {/* Name on Card */}
        <div>
          <label className="block font-semibold">Name on Card</label>
          <input
            type="text"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Traveler Details */}
        <h3 className="text-lg font-semibold mt-4">Traveler Details</h3>
        <div>
          <label className="block font-semibold">Traveler Name</label>
          <input
            type="text"
            name="name"
            value={travelerData.name}
            onChange={handleTravelerChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Age Group</label>
          <input
            type="text"
            name="ageGroup"
            value={travelerData.ageGroup}
            onChange={handleTravelerChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Gender</label>
          <input
            type="text"
            name="gender"
            value={travelerData.gender}
            onChange={handleTravelerChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Date of Birth</label>
          <input
            type="text"
            name="dob"
            value={travelerData.dob}
            onChange={handleTravelerChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default FllightBooking;
