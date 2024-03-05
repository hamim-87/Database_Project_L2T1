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
    
    


    console.log("trip update: " );
    
    
    const from = req.body.source;
    const to = req.body.destination;
    const user = req.body.username;
    const qrcode = req.body.qrcode;

    


    console.log("from: " + from);
    console.log("to: " + to);
    console.log("user: " + user);
    console.log("qrcode: " + qrcode);
    
    
    //console.log(user);

    const sql = `
    DECLARE
    BEGIN
    START_JOURNEY(:from,:to,:user,:qrcode);
    END;
    `;

    const binds = {
        from: from,
        to: to,
        user: user,
        qrcode: qrcode
    }

 
    const result = await execute(sql,binds,options);
    console.log("sql res");
    console.log(result);
    res.send({massage: "done"});

        
    

    
});

export default router;

