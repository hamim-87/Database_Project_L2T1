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
    
    


    console.log("trip validity: " );
    
    
    const from = req.body.source;
    const to = req.body.destination;
    const user = req.body.username;


    console.log("from: " + from);
    console.log("to: " + to);
    console.log("user: " + user);
    
    
    //console.log(user);

    const sql = `
    BEGIN
        :tripvalidity :=IS_VALID_TRIP(:from, :to, :user);
    END;
    `;

    const binds = {
        from: from,
        to: to,
        user: user,
        tripvalidity: {type : oracleDB.STRING, dir: oracleDB.BIND_OUT}
    }

 
    const result = await execute(sql,binds,options);
    console.log("sql res");
    console.log(result);
    res.send(result);

        
    

    
});

export default router;

