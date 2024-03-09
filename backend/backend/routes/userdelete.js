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
    
    


    //console.log("in card balance----------------------------->")
    
    const username = req.body.username;
    
    
    
    console.log(username +"to be deleted????");

    const sql = `
        Delete from user_info where user_name='${username}'
    `;

    try{
        const result = await execute(sql,[]);
        console.log(result.rows);

        //returning to the client
        res.send({massage: true});
        

    }catch(err){
        
        
        console.error(err);
    }

    
});

export default router;

