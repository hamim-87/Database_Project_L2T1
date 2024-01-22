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
    const TimeTablePath = path.join(__dirname, '..','..','Frontend','timetable.html');
    console.log(TimeTablePath);

    res.sendFile(TimeTablePath);
});

router.post('/',async (req, res) =>{


    //console.log(req.body);
    let from = req.body.enteredStation;
    

    console.log(from);
    
    const sql = `
    SELECT time
    FROM TIME_TABLE T JOIN STATION S ON T.STATION_ID=S.STATION_ID AND T.DIRECTION=S.PLATFORM
    WHERE T.Time >= REPLACE( TO_CHAR(SYSDATE, 'HH24:MI'),':','') AND S.STATION_NAME='${from}' AND S.PLATFORM=1
    ORDER BY TIME
    `;
    let motijhilend,uttoraend;
    try{
        const result = await execute(sql,[]);
        console.log(result.rows);
        motijhilend = result.rows;

        //returning to the client
        //res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }

    const sql2 = `
    SELECT time
    FROM TIME_TABLE T JOIN STATION S ON T.STATION_ID=S.STATION_ID AND T.DIRECTION=S.PLATFORM
    WHERE T.Time >= REPLACE( TO_CHAR(SYSDATE, 'HH24:MI'),':','') AND S.STATION_NAME='${from}' AND S.PLATFORM=2
    ORDER BY TIME
    `;

    try{
        const result = await execute(sql2,[]);
        console.log(result.rows);

        //returning to the client
        //res.send(result.rows);

        uttoraend = result.rows;
        

    }catch(err){
        
        
        console.error(err);
    }

    const combinedJson = {
        Motijheel_End: motijhilend,
        Utarra_End: uttoraend
    };

    res.send(combinedJson);
    

    
});

export default router;