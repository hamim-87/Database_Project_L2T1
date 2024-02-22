"use client"
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

            console.log("login success");
            router.replace("/register");

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

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default loginPage;