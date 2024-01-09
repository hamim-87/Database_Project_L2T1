import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';

import bodyParser from 'body-parser';


const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());
router.get('/', (req, res) => {
    const filePath = path.join(__dirname,'..', '..', 'Frontend', 'signup.html');
    
    res.sendFile(filePath);

});

router.post('/', (req, res) => {
    console.log("Form submitted..");
    console.log(req.body);

    let {fullName, Nid, gmail, birthDate, phoneNumber, birthCertificate,address, password,gender} = req.body;

    Nid = parseInt(Nid);
    phoneNumber = parseInt(phoneNumber);
    birthCertificate = parseInt(birthCertificate);

    if(gender === "female") gender = "F";
    else gender = "M";
    

    console.log(typeof(Nid));
    console.log(Nid);
    console.log(birthDate);
    console.log(gender);
});


export default router;