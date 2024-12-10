import React, { useState, ChangeEvent } from 'react';
import { Save, Edit, MessageSquare, Key } from 'lucide-react';
import axios from 'axios';

interface FormValues {
    apiToken: string;
    apiDetails: string;
}

interface EditableFields {
    apiToken: boolean;
    apiDetails: boolean;
}

const SmsSettings: React.FC = () => {
    const [editableFields, setEditableFields] = useState<EditableFields>({
        apiToken: false,
        apiDetails: false
    });
    
    const [formValues, setFormValues] = useState<FormValues>({
        apiToken: '',
        apiDetails: ''
    });

    const handleEditAll = () => {
        setEditableFields({
            apiToken: true,
            apiDetails: true
        });
    };

    const handleSaveAll = async () => {
        try {
            await axios.post('http://localhost:5000/api/smstoken', {
                accountSid: formValues.apiToken,
                authToken: formValues.apiDetails,
            });
            setEditableFields({
                apiToken: false,
                apiDetails: false
            });
            alert('Credentials updated successfully');
        } catch (error) {
            console.error('Error updating credentials:', error);
            alert('Failed to update credentials');
        }
    };

    const handleInputChange = (fieldName: keyof FormValues, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const EditableInput = ({
        icon: Icon,
        label,
        name,
        value,
        readOnly,
        isTextArea = false
    }: {
        icon: React.ElementType;
        label: string;
        name: keyof FormValues;
        value: string;
        readOnly: boolean;
        isTextArea?: boolean;
    }) => (
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <label className="text-gray-600 dark:text-gray-300 capitalize font-medium">
                    {label}
                </label>
            </div>
            <div>
                {isTextArea ? (
                    <textarea
                        value={value}
                        onChange={(e) => handleInputChange(name, e.target.value)}
                        readOnly={readOnly}
                        className={`w-full px-3 py-2 border rounded-lg 
                            dark:bg-gray-600 dark:text-white 
                            focus:outline-none focus:ring focus:border-blue-500
                            ${readOnly ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`
                        }
                        rows={4}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(name, e.target.value)}
                        readOnly={readOnly}
                        className={`w-full px-3 py-2 border rounded-lg 
                            dark:bg-gray-600 dark:text-white 
                            focus:outline-none focus:ring focus:border-blue-500
                            ${readOnly ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`
                        }
                    />
                )}
            </div>
        </div>
    );

    const isEditing = Object.values(editableFields).some(field => field);

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">SMS API Settings</h2>
                        <button
                            onClick={handleEditAll}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                            disabled={isEditing}
                        >
                            Edit
                            <Edit className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-6">
                    <EditableInput
                        icon={MessageSquare}
                        label="Account SID"
                        name="apiToken"
                        value={formValues.apiToken}
                        readOnly={!editableFields.apiToken}
                    />

                    <EditableInput
                        icon={Key}
                        label="Auth Token"
                        name="apiDetails"
                        value={formValues.apiDetails}
                        readOnly={!editableFields.apiDetails}
                        
                    />

                    {isEditing && (
                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={handleSaveAll}
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

export default SmsSettings;