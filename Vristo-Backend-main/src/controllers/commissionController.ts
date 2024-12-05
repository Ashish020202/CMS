import Commission from "../models/commissionModel";

export const commissionSettings = async (req:any,res:any)=>{
    const {flightCommission,hotelCommission} = req.body;

    if(flightCommission >=0 && flightCommission<=100 && hotelCommission>=0 && hotelCommission<=100){
        try {
            const updatedSettings = Commission.findOneAndUpdate(
                {},
                {flightCommission,hotelCommission},
                {new:true,upsert:true}
            )
            res.status(200).json({
                message:'commission updated sucessfully',
                updatedSettings
            });
            
        } catch (error) {
            res.status(500).json({
                message:'error updating commission setting',error
            })
            
        }
    }else{
        res.status(400).json({message:'invalid commission value'});
    }

}