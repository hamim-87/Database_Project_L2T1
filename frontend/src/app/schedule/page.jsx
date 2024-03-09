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
  


function schedulePage(){

    const drawerTriggerRef = useRef(null);

    const [noAvailableMetro, setNoAvailableMetro] = useState(false);

    const [stations, setStations] = useState([]);

    const [source ,setSource] = useState("");

    const [timetable, setTimetable] = useState([]);

    const [destination, setDestination] = useState("");

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
          console.log("giveMe the price");
          axios
            .post('http://localhost:8080/timetable',{
                source: source,
                destination: destination
            })
            .then((response) => {
                console.log(response);
                if(response.data.length == 0) setNoAvailableMetro(true);
                setTimetable(response.data);
            })

            
            
            
        }
      }, [source, destination]);

      useEffect(()=>{
        if(source && destination) {
            
            drawerTriggerRef.current.click();
        }

      },[timetable]);
      

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


            <Drawer>
                <DrawerTrigger ref={drawerTriggerRef} ></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-center">
                        <DrawerTitle className="mx-auto">Time Table</DrawerTitle>
                            <DrawerDescription className="text-center">
                                <div className="mx-auto" >{source}</div>
                                
                    
                            </DrawerDescription>
                            

                            <Table>
                                <TableCaption></TableCaption>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead className="w-[100px]">Time</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead className="text-right">Remaining Time</TableHead>
                                    
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                
                                            {timetable.map((time) =>(

                                                <TableRow key={time.Time}>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>

                                                <TableCell>{time.Time}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell className="text-right">{time.REMAINING}</TableCell>
                                                </TableRow>
                                            ))}

                                            {noAvailableMetro && <TableRow >
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>NO TRAINS AVAILABLE </TableCell>
                                            <TableCell className="text-right"></TableCell>
                                            </TableRow>}

                                            

                                </TableBody>
                                </Table>
                        </DrawerHeader>
                    <DrawerFooter>
                    
                        <DrawerClose>
                            <Button variant="outline" onClick={handleReset}>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        
        </>
    );
}

export default schedulePage;

