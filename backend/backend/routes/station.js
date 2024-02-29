import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';
import {startup, shutdown, execute} from '../database/dbconnect.js';


import bodyParser from 'body-parser';


const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.get('/',async (req, res) =>
{
    const sql = `
    SELECT *
    FROM STATION
    WHERE PLATFORM=1
    ORDER BY STATION_ID
    `;

    try{
        const result = await execute(sql,[]);
        console.log(result.rows);

        //returning to the client
        res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }


});



export default router;