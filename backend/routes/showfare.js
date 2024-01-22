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
    console.log(req.body);
    let from = req.body.from[0];
    let to = req.body.from[1];
    console.log(to);
    console.log(from);
    
});

export default router;