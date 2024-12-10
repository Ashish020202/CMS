const express = require('express');
const Coupon = require('../models/couponModel');
const moment = require('moment');
const nodeCron = require('node-cron');

const router = express.Router();

// Get all coupons
router.get('/', async (req:any, res:any) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (err) {
        res.status(500).json({ message: err});
    }
});

// Create a new coupon
router.post('/', async (req:any, res:any) => {
    const coupon = new Coupon(req.body);
    try {
        const newCoupon = await coupon.save();
        res.status(201).json(newCoupon);
    } catch (err) {
        res.status(400).json({ message: err});
    }
});

// Update a coupon
// router.put('/:id', async (req:any, res:any) => {
//     try {
//         const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedCoupon) return res.status(404).json({ message: 'Coupon not found' });
//         res.json(updatedCoupon);
//     } catch (err) {
//         res.status(400).json({ message: err});
//     }
// });

// Delete a coupon
router.delete('/:id', async (req:any, res:any) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
        res.json({ message: 'Coupon deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

nodeCron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running daily check for expired coupons...');
        
        const today = moment().startOf('day');
        const coupons = await Coupon.find();

        const updates = coupons.map(async (coupon:any) => {
            if (coupon.expiryType === 'date' && coupon.expiryDate) {
                const expiryDate = moment(coupon.expiryDate);

                if (expiryDate.isBefore(today)) {
                    coupon.status = 'inactive';
                    coupon.isActive = false;
                    await coupon.save();
                }
            }
        });

        // Wait for all updates to complete
        await Promise.all(updates);

        console.log('Expired coupons updated successfully.');
    } catch (error) {
        console.error('Error while checking for expired coupons:', error);
    }
});

module.exports = router;
