import express from "express";
import {GenerateOffspringService} from "./service/generate-offspring.service";

const app = express();
const path = require('path');
const port = 8080; // default port to listen
const bodyParser = require('body-parser');

let offspring = new GenerateOffspringService();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, './')));

// health check
app.get('/health', function (req, res) {
    return res.json({status: 'UP'});
});
// health check
app.get('/api/offspring', function (req, res) {
    return res.json(offspring.getOffspring());
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
