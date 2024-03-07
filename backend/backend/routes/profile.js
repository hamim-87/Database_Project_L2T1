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
    SELECT Profile_name,Gender,Date_Of_Birth,Phone_NO,Email,NID_NO,Birth_Certificate_NO,Address
FROM USER_INFO
WHERE USER_NAME='${username}'
    `;

    try{
        const result = await execute(sql,[]);
        console.log("sql res");
        console.log(result);

        

        res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }



    
});

export default router;