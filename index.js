// Entry Point of the API Server  
  
const express = require('express'); 
const db = require('./queries')
var cors = require("cors");


/* Creates an Express application.  
   The express() function is a top-level  
   function exported by the express module. 
*/
const app = express(); 
const Pool = require('pg').Pool; 
  
const pool = new Pool({ 
    user: 'postgres', 
    host: 'localhost', 
    database: 'backend', 
    password: 'waitforit20', 
    dialect: 'postgres', 
    port: 5432 
}); 
  
  
/* To handle the HTTP Methods Body Parser  
   is used, Generally used to extract the  
   entire body portion of an incoming  
   request stream and exposes it on req.body  
*/
const bodyParser = require('body-parser'); 
app.use(cors());

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false })); 
  
  
pool.connect((err, client, release) => { 
    if (err) { 
        return console.error( 
            'Error acquiring client', err.stack) 
    } 
    client.query('SELECT NOW()', (err, result) => { 
        release() 
        if (err) { 
            return console.error( 
                'Error executing query', err.stack) 
        } 
        console.log("Connected to Database !") 
    }) 
}) 
  
// app.get('/testdata', (req, res, next) => { 
//     console.log("TEST DATA :"); 
//     pool.query('SELECT * FROM Employee') 
//         .then(testData => { 
//             console.log(testData); 
//             res.send(testData.rows); 
//         }) 
// }) 

app.get('/All', db.getAll, async (req, res) =>{})
app.get('/All/:id', db.getEntryById, async (req, res) =>{})
app.post('/All', db.createEntry, async (req, res) =>{})
app.put('/All/:id', db.updateEntry, async (req, res) =>{})
app.delete('/All/:id', db.deleteEntry, async (req, res) =>{})


  
// Require the Routes API   
// Create a Server and run it on the port 3000 
const server = app.listen(4000, function () { 
    let host = server.address().address 
    let port = server.address().port 
    // Starting the Server at the port 3000 
}) 