import express from 'express';
import {dirname}  from 'path';
import path from 'path';
import {fileURLToPath} from 'url';
import {connectToOracle} from './dbconnect.js';




const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/signup', (req, res) => {
    const filePath = path.join(__dirname, '..', 'Frontend', 'signup.html');
    res.sendFile(filePath);

});


app.listen(port,()=>{
    console.log(`listening on ${port}`);
});

connectToOracle();