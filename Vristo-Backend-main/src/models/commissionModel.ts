import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema({
    flightCommission:{type:Number , required:true, min:0 , max:100},
    hotelCommission:{type:Number , required:true, min:0 , max:100},
})

const Commission = mongoose.model('Commission',commissionSchema);

export default Commission;

