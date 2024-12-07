import axios from "axios";

const hotelcancleUrl = 'https://hotel.srdvtest.com/v8/rest/SendHotelChangeRequest';

interface hotelcancleInterface {
    BookingId: string;
    RequestType: string;
    BookingMode: string;
    Remarks: string;
    SrdvType: string;
    SrdvIndex: string;
    EndUserIp: string;
    ClientId: string;
    UserName: string;
    Password: string;
}

export async function hotelcancle(payload:hotelcancleInterface) {
    try{
        const response = await axios.post(hotelcancleUrl,payload,{
            headers: { 'Content-Type': 'application/json',
                'Api-Token': 'CheapiTr@3@35'
           },
        })
        return response.data;
    }catch(error){
        throw new Error('error')
    }
    
}