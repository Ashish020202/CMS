const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import { Request, Response } from 'express';
import { error } from 'console';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hotelcancle } from './services/hotelcancleService';
import {flightcancle} from './services/flightCancleService';
const couponRoutes = require('./routes/couponRoute');

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


  //user details
  const UserRegSchema = new mongoose.Schema({
    email: { 
      type: String, 
      required: true, 
      unique: true 
  },
  password: { 
      type: String, 
      required: true 
  },
    bookingStatus: { 
      type: String, 
      enum: ['Active', 'Inactive'], 
      default: 'Active' 
  },
},{ collection: 'users' });

const RegisteredUser = mongoose.model('Airport.users', UserRegSchema);

const getUserDetailResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    
  
    const userDetailData = await RegisteredUser.find({});

    if (userDetailData) {
      res.status(200).json(userDetailData);
      console.log(userDetailData);
      
  } else {
      res.status(404).json({ message: 'No user data found' });
  }
     
    
  } catch (error) {
    console.error("unable to send user details", error);
    res.status(500).json({ error: "Server error" });
  }
};



const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email,bookingStatus } = req.body;

      // Validate input
      if (!bookingStatus) {
          res.status(400).json({ 
              message: 'Email and booking status are required' 
          });
          return;
      }

      // Find and update the user
      const updatedUser = await RegisteredUser.findOneAndUpdate(
          { email: email },
          {   
              
              bookingStatus: bookingStatus 
          },
          { 
              new: true,  // Return the updated document
              runValidators: true  // Ensure enum validation runs
          }
      );

      // Check if user was found and updated
      if (!updatedUser) {
          res.status(404).json({ 
              message: 'User not found' 
          });
          return;
      }

      // Successful update
      res.status(200).json({
          message: 'Booking status updated successfully',
          user: {
              email: updatedUser.email,
              bookingStatus: updatedUser.bookingStatus
          }
      });
  } catch (error) {
      console.error("Unable to update booking status", error);
      
      // Handle specific mongoose validation errors
      if (error instanceof mongoose.Error.ValidationError) {
          res.status(400).json({ 
              error: "Invalid booking status",
              details: error.message 
          });
      } else {
          res.status(500).json({ 
              error: "Server error during booking status update" 
          });
      }
  }
};

app.get('/api/users',getUserDetailResponse);
app.patch('/api/updatedusers',updateUser)




  //twilio credential

  const TwilioCredentialsSchema = new mongoose.Schema({
    accountSid: { type: String, required: true },
    authToken: { type: String, required: true },
  });
  
  const TwilioCredentials = mongoose.model('TwilioCredentials',TwilioCredentialsSchema)

  app.post('/api/smstoken', async (req:any, res:any) => {
    const { accountSid, authToken } = req.body;
  
    if (!accountSid || !authToken) {
      return res.status(400).json({ message: 'Account SID and Auth Token are required.' });
    }
  
    try {
     
      const existingCredentials = await TwilioCredentials.findOne();
      if (existingCredentials) {
        existingCredentials.accountSid = accountSid;
        existingCredentials.authToken = authToken;
        await existingCredentials.save();
        return res.status(200).json({ message: 'Credentials updated successfully.' });
      }
  
      
      const newCredentials = new TwilioCredentials({ accountSid, authToken });
      await newCredentials.save();
      res.status(201).json({ message: 'Credentials saved successfully.' });
    } catch (error) {
      console.error('Error saving credentials:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

const initializeCommissionSettings = async () => {
    const count = await Commission.countDocuments();
    if (count === 0) {
        const defaultSettings = new Commission({ flightCommission: 10, hotelCommission: 15 });
        await defaultSettings.save();
        console.log('Default commission settings initialized.');
    }
};

const hotelCancleResponseSchema = new mongoose.Schema({
  responseStatus: { type: Number, required: true },
  srdvType: { type: String, required: true },
  srdvIndex: { type: String, required: true },
  traceId: { type: String, required: true },
  changeRequestId: { type: Number, required: true },
  changeRequestStatus: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const canclehotel = mongoose.model('canclehotelResponse', hotelCancleResponseSchema);


app.post('/api/hotelcancle',async (req: Request, res: Response) => {
  const { BookingId, Remarks, EndUserIp, ClientId, UserName, Password } = req.body;

  if (!BookingId || !Remarks) {
      return res.status(400).json({ error: "BookingId and Remarks are required" });
  }

  try {
      const requestData = {
          BookingId,
          RequestType: "4", // Change request type for cancellation
          BookingMode: "5", // Mode specific to the booking
          Remarks,
          SrdvType: "SingleTB",
          SrdvIndex: "SrdvTB",
          EndUserIp,
          ClientId,
          UserName,
          Password,

          // BookingId:"1554760",
          // RequestType: "4", // Change request type for cancellation
          // BookingMode: "5", // Mode specific to the booking
          // Remarks:"hotel cancelled",
          // SrdvType: "SingleTB",
          // SrdvIndex: "SrdvTB",
          // EndUserIp:"103.168.165.86",
          // ClientId:"180130",
          // UserName:"CheapiTr",
          // Password:"CheapiTr@3"
      };

      const response = await hotelcancle(requestData);
      if (response) {
        // Save the response in the database
        const savedResponse = new canclehotel({
          responseStatus: response.ResponseStatus,
          srdvType: response.SrdvType,
          srdvIndex: response.SrdvIndex,
          traceId: response.TraceId,
          changeRequestId: response.ChangeRequestId,
          changeRequestStatus: response.ChangeRequestStatus,
        });
       await savedResponse.save();
       res.status(200).json(response);
  } else {
    res.status(500).json({ error: "Invalid response from hotelcancle service" });
  }
  }catch (error) {
      res.status(500).json({ error: error});
  }
});




app.post('/api/flightcancle',async(req:Request,res:Response)=>{

  const { TraceId,RequestType,EndUserIp,ClientId,UserName,Password } = req.body;


  try {
      const flightrequestData = {
          TraceId,
          RequestType,
          EndUserIp,
          ClientId,
          UserName,
          Password,

          // BookingId:"1554760",
          // RequestType: "4", // Change request type for cancellation
          // BookingMode: "5", // Mode specific to the booking
          // Remarks:"hotel cancelled",
          // SrdvType: "SingleTB",
          // SrdvIndex: "SrdvTB",
          // EndUserIp:"103.168.165.86",
          // ClientId:"180130",
          // UserName:"CheapiTr",
          // Password:"CheapiTr@3"
      };

      const response = await  flightcancle(flightrequestData);
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({ error: error});
  }


})

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

app.use('/api/coupons', couponRoutes);

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



