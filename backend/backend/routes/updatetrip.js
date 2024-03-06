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

    const sql2 = `
    SELECT (TRUNC(TIME/100) || ':' || SUBSTR(TO_CHAR(TIME), LENGTH(TO_CHAR(TIME))-1)) AS "Time"
FROM METRO_ROUTE
WHERE DIRECTION=DIRECTION_STATUS('${from}','${to}') AND STATION_ID=(SELECT STATION_ID
                                                                    FROM STATION 
																    WHERE STATION_NAME = '${to}' AND PLATFORM = 1)
 AND 
 METRO_NO=(SELECT METRO_NO
			FROM METRO_ROUTE 
			WHERE DIRECTION=DIRECTION_STATUS('${from}','${to}') 
			AND 
			TIME=(SELECT T.TIME
			FROM TIME_TABLE T JOIN STATION S ON T.STATION_ID=S.STATION_ID AND T.DIRECTION=S.PLATFORM
			WHERE T.Time >= TO_NUMBER(REPLACE( TO_CHAR(SYSDATE, 'HH24:MI'),':','')) 
			AND S.STATION_NAME='${from}'
		    AND S.PLATFORM=DIRECTION_STATUS('${from}','${to}')
			ORDER BY TIME
			FETCH FIRST 1 ROWS ONLY) 
              AND STATION_ID=(SELECT STATION_ID
															FROM STATION 
															WHERE STATION_NAME ='${from}' AND PLATFORM = 1))
AND TIME>(SELECT T.TIME
										FROM TIME_TABLE T JOIN STATION S ON T.STATION_ID=S.STATION_ID AND T.DIRECTION=S.PLATFORM
										WHERE T.Time >= TO_NUMBER(REPLACE( TO_CHAR(SYSDATE, 'HH24:MI'),':','')) 
										AND S.STATION_NAME='${from}'
										AND S.PLATFORM=DIRECTION_STATUS('${from}','${to}')
										ORDER BY TIME
										FETCH FIRST 1 ROWS ONLY)
ORDER BY TIME
FETCH FIRST 1 ROWS ONLY
    `;

    const result2 = await execute(sql2,[]);

    console.log(result2.rows);
    res.send(result2.rows);

        
    

    
});

export default router;

