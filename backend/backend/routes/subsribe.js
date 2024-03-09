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
    


    const sql3 = `
    SELECT COUNT(*) AS "SUBSCRIBER"
    FROM USER_INFO
    `;

    try{
        const result = await execute(sql3,[]);
        console.log(result.rows);

        res.send(result.rows);
    }catch(err){
        
        
        console.error(err);
    }



    
});

export default router;

