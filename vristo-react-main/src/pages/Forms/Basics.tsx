import React, { useState, ChangeEvent } from 'react';

// Types for form values
interface FormValues {
    apiToken: string;
    apiDetails: string;
}

// Types for editable fields state
interface EditableFields {
    apiToken: boolean;
    apiDetails: boolean;
}

// Types for field configuration
interface FieldConfig {
    fieldName: keyof FormValues;
    label: string;
    isTextArea?: boolean;
}

const SmsSettings: React.FC = () => {
    // State to track which fields are editable
    const [editableFields, setEditableFields] = useState<EditableFields>({
        apiToken: false,
        apiDetails: false
    });
    
    // State for form values
    const [formValues, setFormValues] = useState<FormValues>({
        apiToken: 'your-sms-api-token',
        apiDetails: 'your-sms-api-details'
    });

    // Handle edit button click for a specific field
    const handleEditClick = (fieldName: keyof EditableFields): void => {
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    // Handle save for a specific field
    const handleSaveField = (fieldName: keyof EditableFields): void => {
        // Here you can add API call to save the specific field
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: false
        }));
    };

    // Handle input change
    const handleInputChange = (fieldName: keyof FormValues, value: string): void => {
        setFormValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    // Render an editable field with its own edit/save button
    const renderEditableField = ({ fieldName, label, isTextArea = false }: FieldConfig): JSX.Element => {
        const isEditing = editableFields[fieldName];
        
        return (
            <div className="mb-4">
                <label className="block mb-2 font-semibold">{label}</label>
                <div className="flex items-center">
                    {isTextArea ? (
                        <textarea
                            className="form-input flex-grow"
                            value={formValues[fieldName]}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                                handleInputChange(fieldName, e.target.value)
                            }
                            disabled={!isEditing}
                            required
                        />
                    ) : (
                        <input
                            type="text"
                            className="form-input flex-grow"
                            value={formValues[fieldName]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                handleInputChange(fieldName, e.target.value)
                            }
                            disabled={!isEditing}
                            required
                        />
                    )}
                    {!isEditing ? (
                        <button
                            type="button"
                            className="btn btn-primary ml-4"
                            onClick={() => handleEditClick(fieldName)}
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-success ml-4"
                            onClick={() => handleSaveField(fieldName)}
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // Field configurations
    const fields: FieldConfig[] = [
        { fieldName: 'apiToken', label: 'API Token' },
        { fieldName: 'apiDetails', label: 'API Details', isTextArea: true }
    ];

    return (
        <div className="panel">
            <h5 className="font-semibold text-lg dark:text-white-light">SMS API Settings</h5>
            <form className="mb-5" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                {fields.map((field) => renderEditableField(field))}
            </form>
        </div>
    );
};

export default SmsSettings;