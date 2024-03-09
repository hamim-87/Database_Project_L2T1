// pages/admin/dashboard/index.js
"use client"

import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/layout"; // Import the admin layout

import style from './admin.module.css'

import BarChart from "../../components/barchart/barchart"

const data = [
  {
    "country": "Day1",
    "Day1": 175,
    "Day1 Color": "hsl(250, 70%, 50%)",
    
  },
  {
    "country": "Day2",
    "Day2": 184,
    "hot dogColor": "hsl(254, 70%, 50%)",
    
  },
  {
    "country": "Day3",
    "Day3": 101,
    "hot dogColor": "hsl(256, 70%, 50%)",
    
  },
  {
    "country": "Day4",
    "Day4": 198,
    "friesColor": "hsl(222, 70%, 50%)",
    
  },
  {
    "country": "Day5",
    "Day5": 146,
    "donutColor": "hsl(122, 70%, 50%)"
  },
  {
    "country": "Day6",
    "Day6": 32,
    "hot dogColor": "hsl(331, 70%, 50%)",
   
  },
  {
    "country": "Day7",
    "Day7": 186,
    "hot dogColor": "hsl(170, 70%, 50%)",
    
  }
]

import axios from "axios";
import { Button } from "@/components/ui/button"

const AdminDashboard = () => {
  // Your admin dashboard content goes here

  const [info, setInfo] = useState(data);

  const [stats, setStats] = useState({total:"", money:"", SUBSCRIBER:""});

  const [sub, setSub] = useState("");
  

  const [userInfo,setUserInfo] = useState({username:"", password:""});

  function handleInput(e){
    setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
}
  useEffect(()=>{

    axios
        .get('http://localhost:8080/states')
        .then((response) => {
            
            console.log(response.data);
            console.log(response.data.MONEY);


            setStats(response.data);
            

            
        });

        axios
        .get('http://localhost:8080/subscribe')
        .then((response) => {
            
            console.log(response.data);
            


           setSub(response.data[0].SUBSCRIBER);
            

            
        });

    try{
        axios
        .get('http://localhost:8080/chart')
        .then((response) => {
          const responseData = response.data;
          const updatedInfo = responseData.map((item, index) => {
            const day = `Day${index + 1}`;
            return {
              country: day,
              [day]: item.Total_trip,
              [`${day} Color`]: "hsl(250, 70%, 50%)", // Example color value
            };
          });
          setInfo(updatedInfo);
        });


        

        
    }catch(e){

    }
  },[])

  async function handleSubmit(){

    axios
    .post('http://localhost:8080/userdelete',{
        username: userInfo.username,
        
    })
    .then((response) => {
        console.log(response.data);
        
    });
  }

  console.log(userInfo);

  return (
    <div className={style.main}>
        <div className={style.header}>
            <div className={style.dashboard}>
                Dashboard
            </div>
        </div>

        <div className={style.three}>
                <div className={style.subscriber}>
                    <div className={style.textcol}>Total Subscriber</div>
                    <div className={style.textcol}>{sub}</div>
                </div>
                <div className={style.revenue}>
                    
                    <div className={style.textcol}>Total Revenue</div>
                    <div className={style.textcol}>{stats.money}</div>
                </div>

                <div className={style.trip}>
                    
                    <div className={style.textcol}>Total Trip</div>
                    <div className={style.textcol}>{stats.total}</div>
                </div>
        </div>

        <div className={style.chart}>
            <BarChart data = {info} />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={(e)=>handleInput(e)} className={style.inputtext}  required />


                <Button type="submit">Confirm</Button>
            </form>
        </div>
    </div>
  );
};

// Assign the admin layout to this page
AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
