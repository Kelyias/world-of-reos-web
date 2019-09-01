import express from "express";
import {GenerateOffspringService} from "./service/generate-offspring.service";
import {RollReoseanRequest} from "../../common-models/rest/roll-reosean-request";

const app = express();
const path = require('path');
const port = 8080; // default port to listen
const bodyParser = require('body-parser');

let offspring = new GenerateOffspringService();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, './static')));

// health check
app.get('/health', function (req, res) {
    return res.json({status: 'UP'});
});
// generate
app.post('/api/roll', function (req, res) {
    let request = req.body as RollReoseanRequest;
    let response = offspring.getOffspring(request);
    console.log(JSON.stringify({request: request, response: response}));
    return res.json(response);
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
