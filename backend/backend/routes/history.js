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



router.post('/', async (req, res) => {
    
    console.log(req.body);

    

    const username = req.body.username;
    

    console.log("only user");
    console.log(username);

    const sql  = `
    SELECT (SELECT STATION_NAME FROM STATION WHERE STATION_ID=Departure_station_id AND PLATFORM=1) AS "ORG",(SELECT STATION_NAME FROM STATION WHERE STATION_ID=Arrival_station_id AND PLATFORM=1) AS "DES",Payment,TO_CHAR(Date_and_time,'DD-MM-YYYY HH24:MI') AS "DATE"
FROM TRAVEL_HISTORY T JOIN USER_INFO U ON  T.USER_ID=U.USER_ID
WHERE U.USER_NAME='${username}'
ORDER BY HISTORY_ID DESC
    `;

    try{
        const result = await execute(sql,[]);
        console.log("sql res");
        console.log(result.rows);

        

        res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }



    
});

export default router;