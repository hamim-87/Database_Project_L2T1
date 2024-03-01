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
router.get('/', (req, res) => {
    const filePath = path.join(__dirname,'..', '..', 'Frontend', 'login.html');
    
    res.sendFile(filePath);

});

router.post('/', async (req, res) => {
    
    const jwtToken = req.body.cookie;
    console.log("got token from client");
    console.log(jwtToken);

    jwt.verify(jwtToken , process.env.JWT_SECRET_KEY,(err,decodedtoken) => {
        if(err)
        {
            console.log("cookies is invalid..");
            res.status(401).json({status: false});
        }else{
            console.log("valid token ....");
            res.status(200).json({status: true});
        }
    });



    
});

export default router;

