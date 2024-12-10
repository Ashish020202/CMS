import React, { useState } from 'react';
import { Save, Edit, Percent } from 'lucide-react';
import axios from 'axios';

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

  const handleEditClick = () => {
    setCommissions(commissions.map(commission => ({
      ...commission,
      isEditing: true
    })));
  };

  const handleSave = async () => {
    const updatedCommission = {
      flightCommission: commissions.find(c => c.id === 'flight')?.value,
      hotelCommission: commissions.find(c => c.id === 'hotel')?.value
    };

    try {
      const response = await axios.post('http://localhost:5000/api/commissions', updatedCommission);
      console.log('commission res', response.data);

      setCommissions(commissions.map(commission => ({
        ...commission,
        isEditing: false
      })));
    } catch (error) {
      console.log('error');
    }
  };

  const handleValueChange = (id: string, newValue: string) => {
    setCommissions(commissions.map(commission =>
      commission.id === id
        ? { ...commission, value: Number(newValue) }
        : commission
    ));
  };

  const EditableInput = ({
    label,
    id,
    value,
    readOnly
  }: {
    label: string;
    id: string;
    value: number;
    readOnly: boolean;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <Percent className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <label htmlFor={id} className="text-gray-600 dark:text-gray-300 capitalize font-medium">
          {label}
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => handleValueChange(id, e.target.value)}
          readOnly={readOnly}
          min="0"
          max="100"
          className={`w-full px-3 py-2 border rounded-lg 
            dark:bg-gray-600 dark:text-white 
            focus:outline-none focus:ring focus:border-blue-500
            ${readOnly ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`
          }
        />
        <span className="ml-2 text-gray-600 dark:text-gray-300">%</span>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Commission Settings</h2>
            <button
              onClick={handleEditClick}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
              disabled={commissions.some(c => c.isEditing)}
            >
              Edit
              <Edit className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        <form className="p-6 space-y-6">
          {commissions.map(commission => (
            <EditableInput
              key={commission.id}
              label={commission.label}
              id={commission.id}
              value={commission.value}
              readOnly={!commission.isEditing}
            />
          ))}

          {commissions.some(c => c.isEditing) && (
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSave}
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

export default Commissions;