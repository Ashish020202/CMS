import React from "react";

const AdminPanel: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
      <ImportantInformation />
      <TravelerDetails />
      <FareSummary />
      <OfferAndDiscounts />
      <CancellationCharges />
    </div>
  );
};

const ImportantInformation: React.FC = () => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Important Information</h2>
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-lg">Traveling to the United States</h3>
        <p><strong>Who can travel?:</strong> All fully vaccinated travelers are allowed to enter the country...</p>
        <p><strong>Destination restrictions:</strong> Non-vaccinated travelers from India cannot enter...</p>
        <p><strong>Additional Note:</strong> Insipidity the sufficient discretion imprudence resolution...</p>
        <p><strong>Propriety Explained:</strong> Explained propriety off out perpetual his you...</p>
        <p><strong>Sister Note:</strong> Was sister for a few longer Mrs sudden talent become...</p>
      </div>
      <div>
        <h3 className="font-bold text-lg">A Note on Guidelines</h3>
        <p>While we do our best to get you the latest information... Please check the travel rules...</p>
      </div>
    </div>
  </div>
);

const TravelerDetails: React.FC = () => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Traveler Details</h2>
    <p className="mb-4">Please make sure you enter the Name as per your passport</p>
    <div className="space-y-4">
      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Adult 1</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Title:</label>
            <select className="w-full p-2 border rounded">
              <option>Select Title</option>
              <option>Mr</option>
              <option>Mrs</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Full Name:</label>
            <input type="text" placeholder="First Name" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date of Birth:</label>
            <div className="flex gap-2">
              <select className="p-2 border rounded"><option>Date</option></select>
              <select className="p-2 border rounded"><option>Select Month</option><option>Jan</option></select>
              <select className="p-2 border rounded"><option>Year</option></select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Nationality:</label>
            <select className="w-full p-2 border rounded">
              <option>Select Nationality</option>
              <option>Indian</option>
              <option>Mali</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Passport Number:</label>
            <input type="text" placeholder="Passport Number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Passport Issuing Country:</label>
            <select className="w-full p-2 border rounded">
              <option>Select Country</option>
              <option>India</option>
              <option>Canada</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Passport Expiry:</label>
            <input type="text" placeholder="Enter passport date" className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Booking Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Mobile Number:</label>
            <input type="text" placeholder="Enter your mobile number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email Address:</label>
            <input type="email" placeholder="Enter your email address" className="w-full p-2 border rounded" />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Proceed To Payment</button>
      </div>
    </div>
  </div>
);

const FareSummary: React.FC = () => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Fare Summary</h2>
    <div className="space-y-2">
      <p><strong>Base Fare:</strong> $38,660 (COVID-19 test required)</p>
      <p><strong>Discount:</strong> +$2,560</p>
      <p><strong>Other Services:</strong> $20</p>
      <p className="font-bold text-lg">Total Fare: $36,500</p>
    </div>
  </div>
);

const OfferAndDiscounts: React.FC = () => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Offer & Discount</h2>
    <div className="flex gap-4">
      <input type="text" placeholder="Coupon code" className="w-full p-2 border rounded" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Apply</button>
    </div>
  </div>
);

const CancellationCharges: React.FC = () => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Cancellation & Date Change Charges</h2>
    <p><strong>Non Refundable:</strong> The cancellation penalty on this booking will depend on how close to the departure date you cancel your ticket.</p>

    <h3 className="font-bold mt-4">Cancellation Charges (BOM - CDG)</h3>
    <table className="w-full text-left mt-2">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Time Frame</th>
          <th className="p-2">Air Free + MMT Free</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="p-2">0 hours to 24 hours</td>
          <td className="p-2">Non Refundable</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">24 hours to 365 days</td>
          <td className="p-2">$16,325 + $250</td>
        </tr>
      </tbody>
    </table>

    <h3 className="font-bold mt-4">Date Change Charges (JFK - BOM)</h3>
    <table className="w-full text-left mt-2">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Time Frame</th>
          <th className="p-2">Air Free + MMT Free + Fare Difference</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="p-2">0 hours to 24 hours</td>
          <td className="p-2">Non Refundable</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">24 hours to 365 days</td>
          <td className="p-2">$16,325 + $250 + Fare Difference</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default AdminPanel;
