import path from 'path';
import express from 'express';
import { fileURLToPath } from "url";
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add middleware to parse incoming json requests and attach data to req.body
app.use(express.json());
app.use(cors());

// serve static files from public folder
app.use(express.static(path.join(__dirname, '../client/public')));


// fetch request triggers this to run and sends this info back to fetch request
// handle request made to /search
app.get('/search', (req, res) => {
  // join current directory with names.json file
  const jsonFile = path.join(__dirname, 'names.json');
  console.log({jsonFile});
  // read content of names.json
    fs.readFile(jsonFile, (err, data) => {
    console.log(data);
    // error for if file has issues reading the file (doesn't exist/can't access it)
    if (err) {
      console.log('error reading file:', err);
      // send 500 status w error message if theres an initial issue
      res.status(500).json({error: 'error reading names'})
    }
    try{
      // parse json file into a JS object
      const parsedJson = JSON.parse(data);
      res.json(parsedJson);
      // error for if file is succesfully read but info might not be valid json
    } catch (parseErr) {
      console.log('error parsing JSON:', parseErr)
      //send 501 status w error message if theres an initial issue
      res.status(501).json({error: 'error parsing JSON data'})
    }
   
  })
})

// check if app is listnening on port 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

export default app;