"use client"
import Link from "next/link";
import style from "./navbar.module.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

function Navbar(){

    const [login, setlogin] = useState(false);
    
    const [showlogin, setShowLogin] = useState(false);

    useEffect(() =>{
        setInterval(()=>{
            if(localStorage.getItem('userName') === null)
        {
            console.log("please login...")
            setlogin(true);
        }
        else{

            console.log("you already log in")
            setlogin(false);
        }
        },1000);
    },[]);

    return (
        <>
            <div className={style.main}>
                <div className={style.logo}>
                    <h2>logo</h2>
                </div>

                <div className={style.menuList}>
                    <ul className={style.linkList}>
                        <li>
                            <Link href="/"className={style.home}>Home</Link>
                        </li>
                        <li>
                            <Link href="/schedule">Schedule</Link>
                        </li>
                        <li>
                            <Link href="/trip">Trip</Link>
                        </li>
                        <li>
                            <Link href="/about">About Us</Link>
                        </li>
                    </ul>
                </div>

                <div className={style.profile}>
                    
                    {login && 
                    <Button asChild>
                            <Link href="/login">Login</Link>
                    </Button>}

                    {login && 
                    <Button asChild variant="destructive">
                            <Link href="/register"  >Register</Link>
                    </Button>}

                    {!login &&
                    
                    <HoverCard>
                        <HoverCardTrigger>Balance</HoverCardTrigger>
                        <HoverCardContent>
                            Your Balance: {localStorage.getItem('balance')}
                        </HoverCardContent>
                    </HoverCard>}

                    {!login &&
                    
                    <div>
                        my profile

                    </div>}

                    {!login &&
                    
                    <Button variant="destructive">
                        log out
                    </Button>}

                    
                </div>



                <div className={style.null}>

                </div>
            </div>

            
        </>
    )
}

export default Navbar;

