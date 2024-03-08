import express from 'express';
import {startup, shutdown, execute} from './backend/database/dbconnect.js';
import oracledb from 'oracledb';
import queries from './backend/database/sqlQueries.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';



import signup from './backend/routes/signup.js';
import stationsFare from './backend/routes/showfare.js';
import travellingTime from './backend/routes/travellingtime.js';
import timeTable from './backend/routes/timetable.js';
import login from './backend/routes/login.js';
import auth from './backend/routes/auth.js';
import station from './backend/routes/station.js';
import cardbalance from './backend/routes/cardbalance.js';
import tripvalidity from './backend/routes/tripvalidity.js';
import updatetrip from './backend/routes/updatetrip.js';
import finishjourney from './backend/routes/finishjourney.js';
import profile from './backend/routes/profile.js';
import updatebalance from './backend/routes/updatebalance.js';
import history from './backend/routes/history.js';

const app = express();
const port = 8080;

//enable cors
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies)
}));

//cookies
app.use(cookieParser());

//for sign up route
app.use('/signup',signup);

//for show fare routes

app.use('/showfare',stationsFare);

//for travelling time route
app.use('/travellingtime',travellingTime);

//for timeTable
app.use('/timeTable',timeTable);

//log in
app.use('/login',login);

//AUTH
app.use('/auth',auth);

//data

//-> station data
app.use('/station',station);

//-> usercard data
app.use('/cardbalance',cardbalance);

//->vlaidity trip
app.use('/tripvalidity',tripvalidity);

//update trip
app.use('/updatetrip',updatetrip);

//finished journey
app.use('/finishjourney',finishjourney);

//profile
app.use('/profile',profile);

//update balace
app.use('/updatebalance',updatebalance);


//history
app.use('/history',history);


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

