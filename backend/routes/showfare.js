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

export default router;