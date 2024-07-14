import {Wrap, WrapItem, Button, Spinner, Text} from "@chakra-ui/react";
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {useEffect, useState} from "react";
import {getCustomers} from "./services/client.js";
import CardWithImage from "./components/Card.jsx";

const App = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCustomers().then(res =>{
            console.log(res)
            setCustomers(res.data.response)
        }).catch(err =>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
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
                <Text>No Customers Found</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Wrap justify={"center"} spacing={"4vmax"}>
                {customers.map((customer, index) =>(
                    <WrapItem key={index}>
                        <CardWithImage {...customer} />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default App;