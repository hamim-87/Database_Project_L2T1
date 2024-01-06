import express from 'express';
import {connectToOracle} from './backend/database/dbconnect.js';


import signup from './backend/routes/signup.js';

const app = express();
const port = 3000;

app.use('/signup',signup);



app.get('/', (req, res) => {
    res.send('Welcome');
});




app.listen(port,()=>{
    console.log(`listening on ${port}`);
});

connectToOracle();