import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';
import {startup, shutdown, execute} from '../database/dbconnect.js';
import options from '../database/dbconnect.js';
import bcrypt from 'bcryptjs';

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';
import oracleDB from 'oracledb';






const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());


router.post('/', async (req, res) => {
    
    


    console.log("trip finished-> " );
    
    
    // const from = req.body.source;
    // const to = req.body.destination;
    const user = req.body.username;
   

    


    // console.log("from: " + from);
    // console.log("to: " + to);
    console.log("user: " + user);
    
    
    
    //console.log(user);

    const sql = `
    BEGIN
		FINISH_JOURNEY(:user);
    END;
    `;

    const binds = {
        
        user: user,
       
    }

 
    const result = await execute(sql,binds,options);
    console.log("sql res");
    console.log(result);

    
    res.send({message: "finished done"});
        
    

    
});

export default router;

