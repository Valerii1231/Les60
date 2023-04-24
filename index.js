import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);


//  1
const PORT = process.env.PORT || 3000;
const app = express();
app.get('/', (req, res)=>{
    res.send('<h1>Wellcome </h1>');
})



//  2
if(process.env.NODE_ENV == 'development') {
        console.log('production mode');       
    } else {
        console.log('development mode');
    }
    


//  3
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
        if (err) {
            console.error(err);
            res.send('<h4>Error</h4>');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.write('<h1>Wellcome !!!</h1>');
            res.write('<h2>Json text:</h2>');
            res.write('<pre>' + content + '</pre>');
            res.end();
        }
    });
});



//  4
app.get('/', async (req, res) => {
    try {
        const content = await fs.promises.readFile(path.join(__dirname, './package.json'));
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Wellcome !!!!!</h1>');
        res.write('<h2>Json text:</h2>');
        res.write('<pre>' + content + '</pre>');
        res.end();
    } catch (err) {
        console.error(err);
        res.send('<h4>Error</h4>');
    }
});



app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
})






