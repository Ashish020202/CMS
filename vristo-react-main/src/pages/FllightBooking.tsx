import React, { useState } from 'react';
import { Plus, Trash2, Clock, Users, Gift, Edit2 } from 'lucide-react';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    {
      id: '1',
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      expiryType: 'date',
      expiryDate: '2024-12-31',
      customerType: 'new',
      isActive: true
    }
  ]);

  const [referralCredits, setReferralCredits] = useState({
    creditAmount: 50,
    minPurchaseAmount: 500
  });

  const [showNewCoupon, setShowNewCoupon] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    type: 'percentage',
    expiryType: 'date',
    expiryDate: '',
    duration: '30',
    durationUnit: 'minutes',
    customerType: 'all'
  });

  const handleAddCoupon = () => {
    const couponToAdd = {
      id: Date.now().toString(),
      ...newCoupon,
      isActive: true
    };
    setCoupons([...coupons, couponToAdd]);
    setShowNewCoupon(false);
    setNewCoupon({
      code: '',
      discount: 0,
      type: 'percentage',
      expiryType: 'date',
      expiryDate: '',
      duration: '30',
      durationUnit: 'minutes',
      customerType: 'all'
    });
  };

  const handleDeleteCoupon = (id:any) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };

  const handleReferralChange = (field:any, value:any) => {
    setReferralCredits(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Coupon Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Coupon Management</h2>
          <button
            onClick={() => setShowNewCoupon(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Coupon
          </button>
        </div>

        {showNewCoupon && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Create New Coupon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter coupon code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({...newCoupon, discount: Number(e.target.value)})}
                    className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="percentage">%</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Type
                </label>
                <select
                  value={newCoupon.expiryType}
                  onChange={(e) => setNewCoupon({...newCoupon, expiryType: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Specific Date</option>
                  <option value="duration">Duration</option>
                  <option value="indefinite">No Expiry</option>
                </select>
              </div>
              {newCoupon.expiryType === 'date' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {newCoupon.expiryType === 'duration' && (
                <div className="flex space-x-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="number"
                      value={newCoupon.duration}
                      onChange={(e) => setNewCoupon({...newCoupon, duration: e.target.value})}
                      className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={newCoupon.durationUnit}
                      onChange={(e) => setNewCoupon({...newCoupon, durationUnit: e.target.value})}
                      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Type
                </label>
                <select
                  value={newCoupon.customerType}
                  onChange={(e) => setNewCoupon({...newCoupon, customerType: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Customers</option>
                  <option value="new">New Customers Only</option>
                  <option value="returning">Returning Customers Only</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowNewCoupon(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCoupon}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Coupon
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {coupons.map(coupon => (
            <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="space-y-1">
                <div className="font-medium">{coupon.code}</div>
                <div className="text-sm text-gray-500">
                  {coupon.discount}{coupon.type === 'percentage' ? '%' : ' Fixed'} Discount
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {coupon.expiryType === 'indefinite' ? 'No Expiry' : 
                     coupon.expiryType === 'date' ? `Expires: ${coupon.expiryDate}` :
                     `Duration:20`}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {coupon.customerType === 'all' ? 'All Customers' :
                     coupon.customerType === 'new' ? 'New Customers' : 'Returning Customers'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDeleteCoupon(coupon.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral System Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Referral System</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Referral Credit Amount
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={referralCredits.creditAmount}
                onChange={(e) => handleReferralChange('creditAmount', e.target.value)}
                className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              <span className="text-gray-600">credits</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Purchase Amount for Referral
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={referralCredits.minPurchaseAmount}
                onChange={(e) => handleReferralChange('minPurchaseAmount', e.target.value)}
                className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              <span className="text-gray-600">amount</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;