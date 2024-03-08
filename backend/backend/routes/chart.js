import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';
import {startup, shutdown, execute} from '../database/dbconnect.js';
import bcrypt from 'bcryptjs';

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';



const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());


router.get('/', async (req, res) => {
    
    


    //console.log("in card balance----------------------------->")
    
    
    
    
    
    //console.log(user);

    const sql = `
    SELECT COUNT(*) AS "Total_trip"
    FROM TRIP_LOG
    GROUP BY TO_CHAR(TRAVEL_DATE,'DD')
    ORDER BY TO_CHAR(TRAVEL_DATE,'DD') DESC
    FETCH FIRST 7 ROWS ONLY
    `;

    try{
        const result = await execute(sql,[]);
        console.log(result.rows);

        //returning to the client
        res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }

    
});

export default router;

