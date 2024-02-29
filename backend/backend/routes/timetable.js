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
    SELECT TO_CHAR(T.TIME)
FROM TIME_TABLE T JOIN STATION S ON T.STATION_ID=S.STATION_ID AND T.DIRECTION=S.PLATFORM
WHERE T.Time >= TO_NUMBER(REPLACE( TO_CHAR(SYSDATE, 'HH24:MI'),':','')) AND S.STATION_ID=(SELECT STATION_ID 
	  																																														FROM STATION 
																																																WHERE STATION_NAME='${from}' AND PLATFORM=1)
AND S.PLATFORM=DIRECTION_STATUS('${from}','${to}')
ORDER BY TIME
    `;
    
    try{
        const result = await execute(sql,[]);
        

      
        res.send(result.rows);
        

    }catch(err){
        
        
        console.error(err);
    }

    
    

    
});

export default router;