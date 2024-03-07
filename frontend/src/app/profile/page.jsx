"use client"
import { useEffect } from "react";
import axios from "axios";

export default function profilePage(){

    useEffect(()=>{
        axios
            .post('http://localhost:8080/profile',{
                username: localStorage.getItem('userName'),
            })
            .then((response) => {
                console.log(response.data);
               
            })
    },[]);
    return (
        <div>profile</div>
    );
}