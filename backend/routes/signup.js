import express from 'express';
import path from 'path';
import {dirname}  from 'path';
import {fileURLToPath} from 'url';



const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));


router.get('/', (req, res) => {
    const filePath = path.join(__dirname,'..', '..', 'Frontend', 'signup.html');
    
    res.sendFile(filePath);

});


export default router;