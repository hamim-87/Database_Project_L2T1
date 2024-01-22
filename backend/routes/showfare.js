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

router.get('/', (req, res) =>
{
    const stationsFarePath = path.join(__dirname, '..','..','Frontend','stationsFare.html');
    console.log(stationsFarePath);

    res.sendFile(stationsFarePath);
});

router.post('/',async (req, res) =>{


    //console.log(req.body);
    let from = req.body.from;
    let to = req.body.to;

    console.log(from);
    console.log(to);
    

    const sql = `
    SELECT AMOUNT
    FROM FARE
    WHERE FROM_STATION=(
                                            SELECT STATION_ID
                                            FROM STATION
                                            WHERE STATION_NAME='${from}' AND PLATFORM=1
                                            )
    AND
    TO_STATION=(
                            SELECT STATION_ID
                            FROM STATION
                            WHERE STATION_NAME='${to}' AND PLATFORM=1
                            )
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