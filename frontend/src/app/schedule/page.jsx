"use client"
 import styles from '@/app/schedule/schedule.module.css';
 import Node from '@/components/node/node';
 import axios from 'axios';

 import { useEffect,useState} from 'react';
 import NodeLine from "@/components/nodeLine/nodeline";


function schedulePage(){

    const [stations, setStations] = useState([]);

    const [source ,setSource] = useState("");

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
        }
      }, [source, destination]);
      

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

export default schedulePage;

