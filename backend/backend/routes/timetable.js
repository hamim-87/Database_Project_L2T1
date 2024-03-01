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


router.post('/',async (req, res) =>{


     console.log(req.body);
    const from = req.body.source;
    const to = req.body.destination;
    

    console.log(from);
    console.log(to);
    
    const sql = `
    SELECT (TRUNC(TIME/100) || ':' || SUBSTR(TO_CHAR(TIME), LENGTH(TO_CHAR(TIME))-1)) AS "Time",  ROUND(((TO_DATE(TO_CHAR(SYSDATE,'YYYY-MM-DD ') || ( TO_CHAR(TRUNC(TIME/100)) || ':' || SUBSTR(TO_CHAR(TIME), LENGTH(TO_CHAR(TIME))-1)), 'YYYY-MM-DD HH24:MI'))-SYSDATE)*24*60,0) AS remaining
    FROM TIME_TABLE T JOIN STATION S ON T.STATION_ID=S.STATION_ID AND T.DIRECTION=S.PLATFORM
    WHERE T.Time >= REPLACE( TO_CHAR(SYSDATE, 'HH24:MI'),':','') AND S.STATION_NAME='${from}'
    AND S.PLATFORM=DIRECTION_STATUS('${from}','${to}')
    ORDER BY TIME
    FETCH FIRST 5 ROWS ONLY
    `;
    
    try{
        const result = await execute(sql,[]);
        
        console.log(result.rows);
            
        res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }

    
    

    
});

export default router;