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

const AdminDashboard = () => {
  // Your admin dashboard content goes here

  const [info, setInfo] = useState(data);

  useEffect(()=>{
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

  return (
    <div className={style.main}>
        <div className={style.header}>
            <div className={style.dashboard}>
                Dashboard
            </div>
        </div>

        <div className={style.three}>
                <div className={style.subscriber}>
                    total subscriber
                </div>
                <div className={style.revenue}>
                    total revenue
                </div>

                <div className={style.trip}>
                    total trip
                </div>
        </div>

        <div className={style.chart}>
            <BarChart data = {info} />
        </div>
    </div>
  );
};

// Assign the admin layout to this page
AdminDashboard.layout = AdminLayout;

export default AdminDashboard;
