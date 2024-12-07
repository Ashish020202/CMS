import axios from "axios";

const flightcancleUrl = 'https://flight.srdvtest.com/v8/rest/GetCancellationCharges';

interface flightcancleInterface {
    TraceId: string;
    RequestType: string;
    ClientId:string;
    EndUserIp: string;
    UserName: string;
    Password: string;
}

export async function flightcancle(payload:flightcancleInterface) {
    try{
        const response = await axios.post(flightcancleUrl,payload,{
            headers: { 'Content-Type': 'application/json',
                'Api-Token': 'CheapiTr@3@35'
           },
        })
        return response.data;
    }catch(error){
        throw new Error('error')
    }
    
}