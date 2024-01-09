import express from 'express';
import {startup, shutdown, execute} from './backend/database/dbconnect.js';
import oracledb from 'oracledb';
import queries from './backend/database/sqlQueries.js';


import signup from './backend/routes/signup.js';

const app = express();
const port = 3000;


app.use('/signup',signup);



app.get('/', async (req, res) => {
    res.send('Welcome');
    
    const sql ="select * from user_info";
    try{
        console.log("swl......................................................");
        let res = await execute(sql,[]);
        console.log(res);

    }catch(err){
        console.error(err);
    }
   
});




app.listen(port,()=>{
    console.log(`listening on ${port}`);
});
startup();

