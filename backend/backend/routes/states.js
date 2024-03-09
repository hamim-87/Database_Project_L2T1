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
    
    const data = {
        total:"",
        money:"",
        sub: ""
    }
    
    
    
    //console.log(user);

    const sql = `
    SELECT COUNT(*) AS "TOTAL"
    FROM TRIP_LOG
    `;

    try{
        const result = await execute(sql,[]);
        console.log(result.rows);

        data.total = result.rows[0].TOTAL;
        

    }catch(err){
        
        
        console.error(err);
    }

    const sql2 = `
    SELECT SUM(PAYMENT) AS "MONEY"
    FROM TRAVEL_HISTORY
    `;

    try{
        const result = await execute(sql2,[]);
        console.log(result.rows);

        data.money = result.rows[0].MONEY;

        

    }catch(err){
        
        
        console.error(err);
    }

    const sql3 = `
    SELECT COUNT(*) AS "SUBSCRIBER"
    FROM USER_INFO
    `;

    try{
        const result = await execute(sql3,[]);
        console.log(result.rows);

        data.sub = result.rows[0].SUBSCRIBER;


        const newdata = JSON.stringify(data);
        
        res.send(newdata);
    }catch(err){
        
        
        console.error(err);
    }



    
});

export default router;

