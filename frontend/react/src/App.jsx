import {Wrap, WrapItem, Button, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {getCustomers} from "./services/client.js";
import CardWithImage from "./components/Card.jsx";
import DrawerForm from "./components/DrawerForm.jsx";

const App = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = () =>{
        setLoading(true);
        getCustomers().then(res =>{
            console.log(res)
            setCustomers(res.data.response)
        }).catch(err =>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    if(loading){
        return(
            <SidebarWithHeader>
                <Spinner color='red.500' />
            </SidebarWithHeader>
        )
    }

    if(customers.length <= 0)
    {
        return (
            <SidebarWithHeader>
                <DrawerForm
                    fetchCustomers={fetchCustomers}
                />
                <Text justify={"center"} spacing={"4vmax"} textAlign={"center"}>No Customers Found</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <DrawerForm
                fetchCustomers={fetchCustomers}
            />
            <Wrap justify={"center"} spacing={"4vmax"}>
                {customers.map((customer, index) =>(
                    <WrapItem key={index}>
                        <CardWithImage {...customer} fetchCustomers = {fetchCustomers}/>
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default App;