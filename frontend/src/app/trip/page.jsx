"use client"
 import styles from '@/app/schedule/schedule.module.css';
 import Node from '@/components/node/node';
 import axios from 'axios';

 import { useEffect,useState,useRef} from 'react';
 import NodeLine from "@/components/nodeLine/nodeline";

 import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import { Button } from "@/components/ui/button"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


function tripPage(){
    const drawerTriggerRef = useRef(null);

    const [stations, setStations] = useState([]);

    const [source ,setSource] = useState("");

    const [fare ,setFare] = useState("");

    const [destination, setDestination] = useState("");

    const { toast } = useToast();

    const [isStartTrip, setIsStartTrip] = useState(false);

    useEffect(()=>{
        axios
            .get('http://localhost:8080/station')
            .then((response) => {
                console.log(response);
                setStations(response.data);
            })

    },[]);

    useEffect(() => {
        console.log(`source: ${source} destination: ${destination}`);
        if (source && destination) {
            
            axios
            .post('http://localhost:8080/showfare',{
                source: source,
                destination: destination
            })
            .then((response) => {
                console.log(response.data[0].AMOUNT);
                setFare(response.data[0].AMOUNT);
            })

            
            
        }
      }, [source, destination]);

      useEffect(()=>{
            //check if he can 
            console.log("generating qrcode");
      },[isStartTrip]);

      function handleStartTrip(){
            console.log(`startTrip:`);
            setIsStartTrip(true);
      }

     
      useEffect(()=>{

            toast({
                variant: "destructive",
                title: "Fare",
                description: fare,
                action: <ToastAction altText="Start Journey" onClick={handleStartTrip}>Start Journey</ToastAction>,
              })
  
      },[fare])
      

    const handleNodeClick = (stationName) => {
        console.log(`Station ID ${stationName} was clicked`);
        // Do something with the clicked station ID
        
        if (source === "") {
            setSource(stationName);
        } else {
            if (source === stationName) {
                setSource("");
            } else {
                if (destination === "") {
                    setDestination(stationName);
                } else {
                    if (destination === stationName) {
                        setDestination("");
                    } else {
                        // Check the price
                    }
                }
            }
        }

        
    };

    function handleReset(){
        setSource("");
        setDestination("");
    }

    return (
        <>
            {stations.map((stn) => (
            <>
            <Node key={stn.STATION_ID} stations= {stn.STATION_NAME} onClickNode={() => handleNodeClick(stn.STATION_NAME)}/>
            {(stn.STATION_ID != 16) && <NodeLine key={stn.STATION_NAME} />}
            </>
        ))}


           
        </>
    );
}

export default tripPage;