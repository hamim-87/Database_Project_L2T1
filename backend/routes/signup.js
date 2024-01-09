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
router.get('/', (req, res) => {
    const filePath = path.join(__dirname,'..', '..', 'Frontend', 'signup.html');
    
    res.sendFile(filePath);

});

router.post('/', async (req, res) => {
    console.log("Form submitted..");
    console.log(req.body);

    let {userName,fullName, Nid, gmail, birthDate, phoneNumber, birthCertificate,address, password,gender} = req.body;

    Nid = parseInt(Nid);
    phoneNumber = parseInt(phoneNumber);
    birthCertificate = parseInt(birthCertificate);


    const sql = `
    INSERT INTO USER_INFO 
    (User_name,Profile_name,Gender,Date_Of_Birth,Phone_NO,Email,NID_NO,Birth_Certificate_NO,Address,Password)
    VALUES ('${userName}','${fullName}','${gender}',TO_DATE('${birthDate}','YYYY-MM-DD'),${phoneNumber},'${gmail}',${Nid},${birthCertificate},'${address}','${password}')
    `;

    try{
        const res = await execute(sql,[]);
        console.log("successfully inserted user..");

    }catch(err){
        console.error(err);
    }

    console.log(typeof(Nid));
    console.log(Nid);
    console.log(birthDate);
    console.log(gender);
});


export default router;