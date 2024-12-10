const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    expiryType: { type: String, enum: ['date', 'duration', 'indefinite'], required: true },
    expiryDate: { type: String },
    expiryDuration: { type: String },
    customerType: { type: String, enum: ['all', 'new', 'returning'], required: true },
    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
