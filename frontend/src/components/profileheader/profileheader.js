"use client"
import style from './profile.module.css';
import { Button } from "@/components/ui/button"

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

  

  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
  
  import { Label } from "@/components/ui/label"



  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  import { Input } from "@/components/ui/input"

  import { useEffect, useState } from 'react';

  import axios from 'axios';

  import HistoryCard from '../historycard/historycard';

function ProfileHeader({userName}){

    const [rechargeInfo,setRechargeInfo] = useState({account:"", recharge:""});

    const [user , setUser] = useState("");

    const [history, setHistory] = useState([]);

    useEffect(()=>{
        setUser(localStorage.getItem("userName"));
    },)

    function handleInput(e){
        console.log("handleInput");
        setRechargeInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    async function handleSubmit(){

        try{
            axios
            .post('http://localhost:8080/updatebalance',{
                username: user,
                recharge: rechargeInfo.recharge
            })
            .then((response) => {
                console.log(response.data);

                localStorage.setItem('balance', response.data[0].BALANCE);

                //SUCCESSFULLY RECHARGE
                
            })

        }catch(e){
            console.log(e);
        }
    }

    console.log(rechargeInfo);


    async function handleHistory(){

        try{
            axios
            .post('http://localhost:8080/history',{
                username: user,
            })
            .then((response) => {
                console.log(response.data);

                setHistory(response.data);
                
            })

        }catch(e){
            console.log(e);
        }

    }
    return (
        <>
            <div className={style.main}>
                    <div className={style.username}>
                        Username:
                    </div>
                    <div className={style.importUser}>
                        
                        {userName}
                    </div>

                    
                    <div className={style.recharge}>
                    <AlertDialog>
                    
                        
                        <Button variant="ghost"><AlertDialogTrigger>Recharge</AlertDialogTrigger></Button>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Don't Have Enough Balance?</AlertDialogTitle>

                                <Tabs defaultValue="account" className="w-[400px]">
                                    <TabsList className="flex w-full">
                                        <TabsTrigger value="account" className="flex-1">Bank</TabsTrigger>
                                        <TabsTrigger value="password" className="flex-1">Mobile</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account">
                                        <Card>
                                        <CardHeader>
                                            <CardTitle>Account</CardTitle>
                                            <CardDescription>
                                            Recharge Your Card Using Your Bank Account.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                            <Label htmlFor="name">Account No:</Label>
                                            <Input id="name" name='account' onChange={(e)=>handleInput(e)}  required />
                                            </div>
                                            <div className="space-y-1">
                                            <Label htmlFor="username">Recharge Amount</Label>
                                            <Input id="username" name='recharge' onChange={(e)=>handleInput(e)}  required />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            
                                        </CardFooter>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="password">
                                        <Card>
                                        <CardHeader>
                                            <CardTitle>Mobile Banking</CardTitle>
                                            <CardDescription>
                                            Recharge Your Card Using Your Bkash/Nagad Number.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                            <Label htmlFor="current">Phone No</Label>
                                            <Input id="current" name='account' onChange={(e)=>handleInput(e)}  required />
                                            </div>
                                            <div className="space-y-1">
                                            <Label htmlFor="new">Recharge Amount</Label>
                                            <Input id="new"  name='recharge' onChange={(e)=>handleInput(e)}  required />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            
                                        </CardFooter>
                                        </Card>
                                    </TabsContent>
                                    </Tabs>


                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>

                    </div>
                    
                    <div className={style.travel}>
                        
                        <Sheet>

                        <Button variant="ghost"  onClick={handleHistory}><SheetTrigger >Travel History</SheetTrigger></Button>
                        
                            <SheetContent>
                                <SheetHeader>
                                <SheetTitle>Your Previous Trips</SheetTitle>
                                
                                    <HistoryCard first="Origin" second ="Destination" third ="Payment" fourth="Date"/>

                                    {history.map((h) => (
                                        <>
                                            <HistoryCard first={h.ORG} second ={h.DES} third ={h.PAYMENT} fourth={h.DATE}/>
                                        </>
                                    ))}
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>

                    </div>
            </div>

        </>
    );
}

export default ProfileHeader;



<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
  </Tooltip>
</TooltipProvider>
