import { FindPharmacyInterface } from "@/datainterface";
import Axiosinstance from "../Axiosinstance/axiosinstance";
import { endpoints } from "../Endpoints/endpoints";



export const fatch = async (prescriptionId:string)=>{
   try{
    const response = await Axiosinstance.post(endpoints.prescribtionidfatch.idfatch, {prescriptionId})
    return response?.data || null
   }catch(error){
    console.log("error", error);
}
}



export const patientDetails = async (prescriptionId:string | string[] | undefined)=>{
    try{
        const response = await Axiosinstance.post(endpoints.patientdetails.details, {prescriptionId})
        return response?.data
    }catch(error){
        console.log("error", error);
        
    }
}



export const Validationfatch = async (data: {dateOfBirth: string, prescriptionId: string})=>{
    try{
        const response = await Axiosinstance.post(endpoints.prescribtionValidationfatch.validationfatch, data)
        return response?.data || []
    }catch(error){
        console.log("error", error);
        
    }
}



export const pharmacyId = async (data: FindPharmacyInterface)=>{
    try{
        const response = await Axiosinstance.post(endpoints.idpharmacy.pharmacy, data)
        return response?.data?.data
    }catch(error){
        console.log("error", error);
        
    }
}