"use client"
 import styles from '@/app/schedule/schedule.module.css';
 import Node from '@/components/node/node';
 import axios from 'axios';

 import { useEffect,useState,useRef} from 'react';
 import NodeLine from "@/components/nodeLine/nodeline";

 import style from './trip.module.css';

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

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import QRCode from 'qrcode';


function tripPage(){
    
    const qrcodeWindowRef = useRef(null);

    const [stations, setStations] = useState([]);

    const [source ,setSource] = useState("");

    const [fare ,setFare] = useState("");

    const [destination, setDestination] = useState("");

    const { toast } = useToast();

    const [isStartTrip, setIsStartTrip] = useState(false);

    const [qrSrc,setQrSrc] = useState("");

    const [showprogress, setShowProgress] = useState(false);

    useEffect(()=>{
        axios
            .get('http://localhost:8080/station')
            .then((response) => {
                console.log(response);
                setStations(response.data);
            })

        if(localStorage.getItem('qrcode')){
            setQrSrc(localStorage.getItem('qrcode'));
            setShowProgress(true);
        }

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
            if(source && destination && isStartTrip)
            {
                console.log("validity check of trip");
                axios
                .post('http://localhost:8080/tripvalidity',{
                    source: source,
                    destination: destination,
                    username: localStorage.getItem('userName')
                })
                .then((response) => {
                    console.log(response.data);

                    if(response.data == 3)
                    {
                        console.log("can genrate qrcode");

                        const qrInfo = {
                            username: localStorage.getItem('userName'),
                            source : source,
                            destination: destination
                        }
                        const jsonQrInfo = JSON.stringify(qrInfo);
                        QRCode.toDataURL(jsonQrInfo).then((val) => setQrSrc(val));
                        
                        qrcodeWindowRef.current.click();

                    }
                    else if(response.data ==2)
                    {
                        console.log("No train availbLe");

                    }
                    else if( response.data == 1)
                    {
                        console.log("not enough balance");
                    }
                    else{
                        console.log("service is closed");

                    }
                    
                })
            }

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

    useEffect(() =>{

        console.log("procedure can run?");
        if(showprogress && source && destination)
        {
            console.log("procedure can run -----> yesssss");
            const qrcodeInfo = localStorage.getItem('userName') + "," + source + "," + destination;
            axios
            .post('http://localhost:8080/updatetrip',{
                source: source,
                destination: destination,
                username: localStorage.getItem('userName'),
                qrcode: qrcodeInfo
            })
            .then((response) => {
                console.log(response.data);
                
            })
        }
    },[showprogress]);
    
    function handleQRcode(){

        localStorage.setItem('qrcode',qrSrc);
        setShowProgress(true);
    }

    function showAgain(){
        qrcodeWindowRef.current.click();
    }
    return (
        <>
            {stations.map((stn) => (
            <>
            <Node key={stn.STATION_ID} stations= {stn.STATION_NAME} onClickNode={() => handleNodeClick(stn.STATION_NAME)}/>
            {(stn.STATION_ID != 16) && <NodeLine key={stn.STATION_NAME} />}
            </>
        ))}

        <AlertDialog>
        <AlertDialogTrigger ref={qrcodeWindowRef}>Open</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Your QR Code...</AlertDialogTitle>
            
            <AlertDialogDescription>
                <img src = {qrSrc} />
                
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleQRcode}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

        {showprogress && <div className={style.progress} onClick={showAgain}> progress bar </div>}

           
        </>
    );
}

export default tripPage;