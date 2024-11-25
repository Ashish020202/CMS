import React, { useState, ChangeEvent } from 'react';


interface FormValues {
    apiToken: string;
    apiDetails: string;
}


interface EditableFields {
    apiToken: boolean;
    apiDetails: boolean;
}


interface FieldConfig {
    fieldName: keyof FormValues;
    label: string;
    isTextArea?: boolean;
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

 
    const handleEditClick = (fieldName: keyof EditableFields): void => {
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    
    const handleSaveField = (fieldName: keyof EditableFields): void => {
        
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: false
        }));
    };

 
    const handleInputChange = (fieldName: keyof FormValues, value: string): void => {
        setFormValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };


    const ApiTokenField = ({ fieldName, label, isTextArea = false }: FieldConfig): JSX.Element => {
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

   
    const fields: FieldConfig[] = [
        { fieldName: 'apiToken', label: 'API Token' },
        { fieldName: 'apiDetails', label: 'API Details', isTextArea: true }
    ];

    return (
        <div className="panel">
            <h5 className="font-semibold text-lg dark:text-white-light">SMS API Settings</h5>
            <form className="mb-5" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                {fields.map((field) => ApiTokenField(field))}
            </form>
        </div>
    );
};

export default SmsSettings;