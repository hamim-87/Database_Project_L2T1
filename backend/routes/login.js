import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';
import {startup, shutdown, execute} from '../database/dbconnect.js';
import bcrypt from 'bcryptjs';

import bodyParser from 'body-parser';


const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());
router.get('/', (req, res) => {
    const filePath = path.join(__dirname,'..', '..', 'Frontend', 'login.html');
    
    res.sendFile(filePath);

});

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
            res.send(`${username} is not found`);
        }

        //checking password
        console.log(result.rows[0].PASSWORD);

        if(bcrypt.compareSync(password, result.rows[0].PASSWORD))
        {
            //
            res.send(`succefully logged in as ${username}`);
        }
        else res.send("Username or password incorrect");
        

    }catch(err){
        
        
        console.error(err);
    }



    
});

export default router;