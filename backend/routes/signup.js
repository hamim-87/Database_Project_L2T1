import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';
import {startup, shutdown, execute} from '../database/dbconnect.js';
import bcrypt from 'bcryptjs';

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

    //password hashing 
    var salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    //bcrypt.compareSync(password, from_db_password);// true or false


    const sql = `
    INSERT INTO USER_INFO 
    (User_name,Profile_name,Gender,Date_Of_Birth,Phone_NO,Email,NID_NO,Birth_Certificate_NO,Address,Password)
    VALUES ('${userName}','${fullName}','${gender}',TO_DATE('${birthDate}','YYYY-MM-DD'),${phoneNumber},'${gmail}',${Nid},${birthCertificate},'${address}','${password}')
    `;

    try{
        const result = await execute(sql,[]);
        console.log(`successfully inserted ${userName}..`);
        res.send(`successfully inserted ${userName}..`);

    }catch(err){
        res.send("user_name or email or birth_certificate or phone number or NID is already taken..");
        
        console.error(err);
    }
    
});


export default router;