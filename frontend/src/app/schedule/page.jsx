"use client"
 import styles from '@/app/schedule/schedule.module.css';
 import Node from '@/components/node/node';
 import axios from 'axios';

 import { useEffect,useState} from 'react';



function schedulePage(){

    const [stations, setStations] = useState([]);

    useEffect(()=>{
        axios
            .get('http://localhost:8080/station')
            .then((response) => {
                console.log(response);
                setStations(response.data);
            })

    },[]);

    return (
        <>
            {stations.map((stn) => (
            <Node key={stn.STATION_ID} stations= {stn.STATION_NAME} />
        ))}
        </>
    );
}

export default schedulePage;

