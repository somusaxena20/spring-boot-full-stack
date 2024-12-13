import axios from "axios";

export const getCustomers = async () =>{
    try{
        console.log(`${import.meta.env.VITE_API_BASE_URL}/API_SERVER/api/v1/customer/`);
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/API_SERVER/api/v1/customer/`);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

export const saveCustomer = async (customer) =>{
    try{
        console.log(`${import.meta.env.VITE_API_BASE_URL}/API_SERVER/api/v1/customer/provision`);
        console.log("Request Body : "+customer)
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/API_SERVER/api/v1/customer/provision`,
                customer
            )
    }
    catch(e){
        throw e;
    }
}

export const deleteCustomer = async (id) =>{
    try{
        console.log(`${import.meta.env.VITE_API_BASE_URL}/API_SERVER/api/v1/customer/${id}`)
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/API_SERVER/api/v1/customer/${id}`
        )
    }
    catch(e){
        throw e;
    }
}