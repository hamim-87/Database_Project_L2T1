"use client"
import { useEffect, useState } from "react";
import axios from "axios";

import ProfileHeader from "@/components/profileheader/profileheader";

import ProfileBody from "@/components/profilebody/profilebody";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"



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
    const keys ={
        name : "Name",
        gender : "Gender",
        dateOfBirth : "Date of Birth",
        email : "Email",
        phoneNumber : "Phone Number",
        nid : "Nid Number",
        birthCertificate : "Birth Certificate No",
        address : "Address",


    }

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
                    dateOfBirth: response.data[0].DATE_OF_BIRTH.substring(0,10),
                    phoneNumber: "+880"+response.data[0].PHONE_NO,
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
            <ProfileBody first = {keys.name} value={userInfo.profileName}/>
            <ProfileBody first = {keys.gender} value={userInfo.gender}/>
            <ProfileBody first = {keys.dateOfBirth} value={userInfo.dateOfBirth}/>
            <ProfileBody first = {keys.phoneNumber} value={userInfo.phoneNumber}/>
            <ProfileBody first = {keys.email} value={userInfo.email}/>
            <ProfileBody first = {keys.nid} value={userInfo.nid}/>
            <ProfileBody first = {keys.birthCertificate} value={userInfo.birthCertificate}/>
            <ProfileBody first = {keys.address} value={userInfo.address}/>

            <div>Update Your Profile</div>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                        Make changes to your account here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
                </Tabs>
                        
        </>
    );
}