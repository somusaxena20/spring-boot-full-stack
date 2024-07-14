import axios from "axios";

export const getCustomers = async () =>{
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/customer/`);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}