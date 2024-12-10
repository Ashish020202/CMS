import React, { useState } from 'react';
import { 
    Plus, 
    Trash2, 
    Clock, 
    Users, 
    Gift, 
    Edit2, 
    Edit, 
    Save ,
    Calendar
} from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';

type Coupon = {
    id: string;
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    expiryType: 'date' | 'duration' | 'indefinite';
    expiryDate?: string;
    expiryDuration?:'1 Hours'|'1 week'| '1 month'| '1 year'|'Indefinite';
    duration?: string;
    durationUnit?: string;
    customerType: 'all' | 'new' | 'returning';
    isActive: boolean;
    status: 'active' | 'inactive';
};

const CouponManagement: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const API_URL = 'http://localhost:5000/api/coupons';

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get<Coupon[]>(API_URL);
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleSaveCoupon = async (coupon: Coupon) => {
        try {
            if (coupon.id) {
                // Update existing coupon
                await axios.put(`${API_URL}/${coupon.id}`, coupon);
            } else {
                // Add new coupon
                await axios.post(API_URL, coupon);
            }
            fetchCoupons();
            setIsEditing(false);
            setSelectedCoupon(null);
        } catch (error) {
            console.error('Error saving coupon:', error);
        }
    };

    const handleDeleteCoupon = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCoupons();
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCoupon) return;
        handleSaveCoupon(selectedCoupon);
    };

    const handleEditToggle = (coupon?: Coupon) => {
        if (coupon) {
            setSelectedCoupon({ ...coupon });
        } else {
            setSelectedCoupon({
                id: '',
                code: '',
                discount: 0,
                type: 'percentage',
                expiryType: 'date',
                customerType: 'all',
                isActive: true,
                status: 'active',
            });
        }
        setIsEditing(true);
        setErrors({});
    };

    const validateField = (name: string, value: string | number) => {
        switch (name) {
            case "code":
                return value.toString().length >= 4 
                    ? "" 
                    : "Coupon code must be at least 4 characters";
            case "discount":
                return Number(value) > 0 
                    ? "" 
                    : "Discount must be greater than 0";
            case "expiryDate":
                return selectedCoupon?.expiryType === 'date' && !value 
                    ? "Expiry date is required" 
                    : "";
            
            default:
                return "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (!selectedCoupon) return;

        // Validate the field
        const errorMessage = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage,
        }));

        // Update the selected coupon
        setSelectedCoupon(prev => prev ? {
            ...prev,
            [name]: name === 'discount' ? Number(value) : value
        } : null);
    };

   
    // Custom input component for consistent styling
    const EditableInput = ({
        icon: Icon,
        label,
        name,
        value,
        readOnly,
        type = "text",
        options = []
    }: {
        icon: React.ElementType;
        label: string;
        name: string;
        value: string | number;
        readOnly?: boolean;
        type?: string;
        options?: string[];
    }) => (
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <label htmlFor={name} className="text-gray-600 dark:text-gray-300 capitalize font-medium">
                    {label}
                </label>
            </div>
            <div>
                {options.length > 0 ? (
                    <select
                        id={name}   
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        disabled={readOnly}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        readOnly={readOnly}
                        className={`w-full px-3 py-2 border rounded-lg 
                            dark:bg-gray-600 dark:text-white 
                            focus:outline-none focus:ring focus:border-blue-500
                            ${readOnly ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}
                            ${errors[name] ? "border-red-500" : ""}
                        `}
                    />
                )}
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
        </div>
    );

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Coupon Management</h2>
                        <button
                            onClick={() => handleEditToggle()}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Add Coupon
                            <Plus className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Coupon List */}
                <div className="p-6 space-y-4">
                    {coupons.map(coupon => (
                        <div 
                            key={coupon.id} 
                            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-between items-center"
                        >
                            <div>
                                <div className="font-semibold text-gray-800 dark:text-white">
                                    {coupon.code}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    {coupon.discount}{coupon.type === 'percentage' ? '%' : ' Fixed'} Discount
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {coupon.expiryType === 'indefinite' 
                                        ? 'No Expiry' 
                                        : coupon.expiryType === 'date' 
                                            ? `Expires: ${coupon.expiryDate}` 
                                            : `Expires in: ${coupon.expiryDuration}`}
                                </div>
                                <div className={`text-sm font-medium ${
                                    coupon.status === 'active' 
                                        ? 'text-green-600' 
                                        : 'text-red-600'
                                }`}>
                                    Status: {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleEditToggle(coupon)}
                                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-md"
                                >
                                    <Edit2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit/Add Coupon Modal */}
                {(isEditing && selectedCoupon) && (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <EditableInput
                            icon={Gift}
                            label="Coupon Code"
                            name="code"
                            value={selectedCoupon.code}
                            readOnly={false}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <EditableInput
                                icon={Users}
                                label="Discount"
                                name="discount"
                                value={selectedCoupon.discount}
                                readOnly={false}
                                type="number"
                            />
                            <EditableInput
                                icon={Clock}
                                label="Discount Type"
                                name="type"
                                value={selectedCoupon.type}
                                readOnly={false}
                                options={['percentage', 'fixed']}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <EditableInput
                                icon={Clock}
                                label="Expiry Type"
                                name="expiryType"
                                value={selectedCoupon.expiryType}
                                readOnly={false}
                                options={['date', 'duration']}
                            />
                            {selectedCoupon.expiryType === 'date' && (
                                <EditableInput
                                    icon={Calendar}
                                    label="Expiry Date"
                                    name="expiryDate"
                                    value={selectedCoupon.expiryDate || ''}
                                    readOnly={false}
                                    type="date"
                                />
                            )}
                             {selectedCoupon.expiryType === 'duration' && (
                                <EditableInput
                                    icon={Calendar}
                                    label="Expiry Duration"
                                    name="expiryDuration"
                                    value={selectedCoupon.expiryDuration || '1 week'}
                                    readOnly={false}
                                    options={['1 Hours','1 week', '1 month', '1 year','Indefinite']}
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <EditableInput
                                icon={Users}
                                label="Customer Type"
                                name="customerType"
                                value={selectedCoupon.customerType}
                                readOnly={false}
                                options={['all', 'new', 'returning']}
                            />
                            <EditableInput
                                icon={Edit}
                                label="Status"
                                name="status"
                                value={selectedCoupon.status}
                                readOnly={false}
                                options={['active', 'inactive']}
                            />
                        </div>
                        
                        <div className="pt-4 flex space-x-2">
                            <button
                                type="button"
                                onClick={() => handleEditToggle()}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition duration-300"
                            >
                                <Save className="mr-2 w-5 h-5" />
                                Save Coupon
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CouponManagement;