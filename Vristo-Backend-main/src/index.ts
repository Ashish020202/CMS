const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors()); 


let commissionSettings = {
    flightCommission: 10, 
    hotelCommission: 15   
};


app.get('/api/commissions', (req:any, res:any) => {
    res.json(commissionSettings);
});


app.post('/api/commissions', (req:any, res:any) => {
    const { flightCommission, hotelCommission } = req.body;

    
    if (flightCommission >= 0 && flightCommission <= 100 && hotelCommission >= 0 && hotelCommission <= 100) {
        commissionSettings.flightCommission = flightCommission;
        commissionSettings.hotelCommission = hotelCommission;

        res.status(200).json({
            message: 'Commissions updated successfully',
            updatedSettings: commissionSettings
        });
    } else {
        res.status(400).json({ message: 'Invalid commission values' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
