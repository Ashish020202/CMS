const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import { error } from 'console';
import mongoose from 'mongoose';

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors()); 

const commissionSchema = new mongoose.Schema({
    flightCommission : {type:Number,required:true,min:0,max:100},
    hotelCommission : {type:Number,required:true,min:0,max:100},
})

const Commission = mongoose.model('commission',commissionSchema)


// let commissionSettings = {
//     flightCommission: 10, 
//     hotelCommission: 15   
// };

const initializeCommissionSettings = async () => {
    const count = await Commission.countDocuments();
    if (count === 0) {
        const defaultSettings = new Commission({ flightCommission: 10, hotelCommission: 15 });
        await defaultSettings.save();
        console.log('Default commission settings initialized.');
    }
};





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

    mongoose.connect('mongodb+srv://manishdevtech:7BSq1653rlpEgQDq@cluster0.jriom.mongodb.net/Airport')
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



