"use client"
import { useEffect, useState } from "react";
import axios from "axios";

import ProfileHeader from "@/components/profileheader/profileheader";

export default function profilePage(){

    const [userInfo ,setUserInfo] = useState({
        profileName: "",
        gender: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        nid: "",
        birthCertificate: "",
        address: "",
    });

    const [user, setUser ] = useState("");

    useEffect(()=>{
        axios
            .post('http://localhost:8080/profile',{
                username: localStorage.getItem('userName'),
            })
            .then((response) => {
                console.log(response.data);

                setUserInfo({
                    profileName: response.data[0].PROFILE_NAME,                
                    gender: response.data[0].GENDER,
                    dateOfBirth: response.data[0].DATE_OF_BIRTH,
                    phoneNumber: response.data[0].EMAIL,
                    email: response.data[0].EMAIL,
                    nid: response.data[0].NID_NO,
                    birthCertificate: response.data[0].BIRTH_CERTIFICATE_NO,
                    address: response.data[0].ADDRESS,
                });
               
            })

        setUser(localStorage.getItem('userName'));
    },[]);
    return (
        <>
            <div>My Profile</div>
            <ProfileHeader userName = {user}/>
            <div>{userInfo.email}</div>
        </>
    );
}