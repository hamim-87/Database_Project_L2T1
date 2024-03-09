// Register.jsx
"use client"
import React from 'react';
import styles from './register.module.css';
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation";


const Register = () => {
    const router = useRouter();
    function handlelogin(){
        router.replace("/login");
    }
    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form action="http://localhost:8080/signup" method="POST" onSubmit={handlelogin}>
                <div className={styles.formGroup}>
                    <label htmlFor="userName">UserName:</label>
                    <Input type="text" name="userName" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="fullName">Name:</label>
                    <Input type="text" name="fullName" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="Nid">Nid</label>
                    <Input type="text" name="Nid" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="gmail">Gmail</label>
                    <Input type="email" name="gmail" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthDate">Birth Date</label>
                    <Input type="date" name="birthDate" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Input type="text" name="phoneNumber" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthCertificate">Birth Certificate</label>
                    <Input type="text" name="birthCertificate" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address:</label>
                    <Input type="text" name="address" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="gender">Select your gender:</label>
                    <select id="gender" name="gender">
                        <option value="none"></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className={styles.formGroup} >
                    <Input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default Register;
