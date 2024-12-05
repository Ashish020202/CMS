const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import { Request, Response } from 'express';
import { error } from 'console';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors()); 

const commissionSchema = new mongoose.Schema({
    flightCommission : {type:Number,required:true,min:0,max:100},
    hotelCommission : {type:Number,required:true,min:0,max:100},
})

const Commission = mongoose.model('commission',commissionSchema)


const hotelbookingSchema = new mongoose.Schema({
    VoucherStatus: Boolean,
    ResponseStatus: Number,
    TraceId: String,
    Status: Number,
    HotelBookingStatus: String,
    InvoiceNumber: String,
    ConfirmationNo: String,
    BookingRefNo: String,
    BookingId: Number,
    IsPriceChanged: Boolean,
    IsCancellationPolicyChanged: Boolean,
    createdAt: Date,
  },{ collection: 'hotelbookingresponses' });
  
  const HotelBooking = mongoose.model('Airport.hotelbookingresponses', hotelbookingSchema);


  const getHotelBookingResponse = async (req: Request, res: Response): Promise<void> => {
    try {
      
    
      const bookingData = await HotelBooking.find({});

      if (bookingData) {
        res.status(200).json(bookingData);
        console.log(bookingData);
        
    } else {
        res.status(404).json({ message: 'No commission data found' });
    }
       
      
    } catch (error) {
      console.error("unable to send commission details", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  app.get('/api/response',getHotelBookingResponse);


// let commissionSettings = {
//     flightCommission: 10, 
//     hotelCommission: 15   
// };

const FlightBookingSchema = new mongoose.Schema({
    bookingId: Number,
    pnr: String,
    airlineName: String,
    flightNumber: String,
    origin: String,
    destination: String,
    passengerName: String,
    contactNo: String,
    email: String,
    totalFare: Number,
    departureTime: String,
    arrivalTime: String,
},{ collection: 'bookings' });

const FlightBooking = mongoose.model('Airport.bookings', FlightBookingSchema);


const getFlightBookingResponse = async (req: Request, res: Response): Promise<void> => {
    try {
      
    
      const flightbookingData = await FlightBooking.find({});

      if (flightbookingData) {
        res.status(200).json(flightbookingData);
        console.log(flightbookingData);
        
    } else {
        res.status(404).json({ message: 'No commission data found' });
    }
       
      
    } catch (error) {
      console.error("unable to send commission details", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  app.get('/api/flight',getFlightBookingResponse);

const initializeCommissionSettings = async () => {
    const count = await Commission.countDocuments();
    if (count === 0) {
        const defaultSettings = new Commission({ flightCommission: 10, hotelCommission: 15 });
        await defaultSettings.save();
        console.log('Default commission settings initialized.');
    }
};

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
}






app.post('/api/commissions', async (req:any, res:any) => {
    const { flightCommission, hotelCommission } = req.body;

    
    if (flightCommission >= 0 && flightCommission <= 100 && hotelCommission >= 0 && hotelCommission <= 100) {
       try{
        const updatedSettings = await Commission.findOneAndUpdate(
            {},
            {flightCommission,hotelCommission},
            {new:true,upsert:true}
        )

        res.status(200).json({
            message: 'Commissions updated successfully',
            updatedSettings
        });
    }catch(error){
        res.status(500).json({ message: 'Error updating commission settings', error });
        
    }
    } else {
        res.status(400).json({ message: 'Invalid commission values' });
    }
});

    mongoose.connect(mongoURI)
          .then(async()=>{
            console.log('connected to mongodb');
            await initializeCommissionSettings();
            app.listen(port, () => {
                console.log(`Server running on http://localhost:${port}`);
            });
            
          })
          .catch(err=>{
            console.log('MongoDb connection error',err);
            
          })



