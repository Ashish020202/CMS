import React, { useState } from 'react';

const Commissions = () => {

  const [commissions, setCommissions] = useState([
    {
      id: 'flight',
      label: 'Flight Commission',
      value: 10,
      isEditing: false
    },
    {
      id: 'hotel',
      label: 'Hotel Commission',
      value: 15,
      isEditing: false
    }
  ]);

  
  const handleEditClick = (id:any) => {
    setCommissions(commissions.map(commission => 
      commission.id === id 
        ? { ...commission, isEditing: true }
        : commission
    ));
  };


  const handleSave = (id:any) => {
    setCommissions(commissions.map(commission => 
      commission.id === id 
        ? { ...commission, isEditing: false }
        : commission
    ));
    
   
    const updatedCommission:any = commissions.find(c => c.id === id);
    console.log(`Updated ${updatedCommission.label}:`, updatedCommission.value + "%");
  };

 
  const handleValueChange = (id:any, newValue:any) => {
    setCommissions(commissions.map(commission =>
      commission.id === id
        ? { ...commission, value: Number(newValue) }
        : commission
    ));
  };

  return (
    <div className="w-full mx-auto my-2 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Commission Settings
      </h2>
      
      <div className="space-y-6">
        {commissions.map(commission => (
          <div key={commission.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {commission.label} (%)
            </label>
            
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={commission.value}
                onChange={(e) => handleValueChange(commission.id, e.target.value)}
                disabled={!commission.isEditing}
                min="0"
                max="100"
                className={`
                  w-24 px-3 py-2 rounded-md border
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${commission.isEditing 
                    ? 'bg-white border-gray-300' 
                    : 'bg-gray-100 border-gray-200'
                  }
                `}
              />
              
              <span className="text-gray-600">%</span>
              
              {commission.isEditing ? (
                <button 
                  onClick={() => handleSave(commission.id)}
                  className="
                    px-4 py-2 text-sm font-medium text-white
                    bg-blue-600 rounded-md
                    hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-colors
                  "
                >
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => handleEditClick(commission.id)}
                  className="
                    px-4 py-2 text-sm font-medium text-gray-700
                    bg-white border border-gray-300 rounded-md
                    hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-colors
                  "
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commissions;