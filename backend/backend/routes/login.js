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

const MAXAGE = 60*60;
const createToken = (username) => {
    return jwt.sign({username},process.env.JWT_SECRET_KEY,{
        expiresIn: MAXAGE
    });
}

router.post('/', async (req, res) => {
    
    console.log(req.body);

    

    const username = req.body.username;
    const password = req.body.password;

    console.log(username);

    const sql  = `
    SELECT PASSWORD
    FROM USER_INFO
    WHERE USER_NAME='${username}'
    `;

    try{
        const result = await execute(sql,[]);
        console.log(result);

        if(result.rows.length== 0)
        {
            res.status(401).json({ message: `${username} is not found` });
        }

        //checking password
        console.log(result.rows[0].PASSWORD);

        if(bcrypt.compareSync(password, result.rows[0].PASSWORD))
        {
            //
            console.log("logged innnnnn");

            //creating the token
            const token = createToken(username);
            
            //
            console.log(token);
            res.cookie('jwt',token,{httpOnly: true, maxAge: MAXAGE*1000});
            res.status(200).json({message: `${username} logged in`});
            
        }
        else res.status(401).json({ message: `${username} is not found` });
        

    }catch(err){
        
        
        console.error(err);
    }



    
});

export default router;