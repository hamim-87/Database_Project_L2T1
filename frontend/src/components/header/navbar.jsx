"use client"
import Link from "next/link";
import style from "./navbar.module.css";

function Navbar(){
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
                    <div>
                        slider
                    </div>
                    <div>
                        my profile
                    </div>
                </div>

                <div className={style.null}>

                </div>
            </div>

            
        </>
    )
}

export default Navbar;

