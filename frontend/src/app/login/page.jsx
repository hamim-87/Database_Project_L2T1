"use client"
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import axios from 'axios';


function loginPage(){
    const router = useRouter();

    const [userInfo,setUserInfo] = useState({username:"", password:""});
    const [cookieData, setCookieData] = useState(null);

    function handleInput(e){
        setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
    }



    async function handleSubmit(e)
    {
        e.preventDefault();
        
        try{
            console.log(userInfo);
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo), // Send data as JSON
                credentials: 'include',
            });
            console.log(res);

            if(res.error)
            {
                
                console.log("Invalid credentials: " );
                return;
            }
            
            // login success
            const data = await res.json();
            console.log(data);

            if (data.status === false) {
                console.log("Login failed");

                router.replace("/schedule");
            } else {

                console.log("Login success");
                localStorage.setItem('userName', userInfo.username);

                try{
                    axios
                    .post('http://localhost:8080/cardbalance',{
                        username: userInfo.username
                    })
                    .then((response) => {
                        console.log(response.data[0].BALANCE);
                        localStorage.setItem('balance', response.data[0].BALANCE);
                    })

                }catch(e){
                    console.log(e);
                }


                router.replace("/home");
            }


        }catch(e)
        {
            
            console.log("Error occur when ")
        }

    }



    console.log(userInfo);
    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={(e)=>handleInput(e)}  required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e)=>handleInput(e)}  required />

                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}

export default loginPage;