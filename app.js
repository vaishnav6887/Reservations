const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser'); // Need after express 4.0 version to parse body of a request 
const mongoClient = require('mongodb').MongoClient; // Get Mongo DB Client
const app = express(); /// Initialize express server
app.use(bodyParser.json()); // To support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // To support encoded bodies

/* Current port at which express server will be serving request */
const port = 8080 

/* 
    Mongo DB connection url. I have used my mlab account to host my MongoDB on Azure cloud services. 
    Reservations collection will be created once we push 1st reservation object.
*/
var url = "mongodb://reservationuser:admin123@ds042607.mlab.com:42607/reservations";
var db;

/**
 * serve static index HTML page.
 */
app.get('/', (req, res) => {
    fs.readFile('index.html', (err, data) => {
        if(err) {
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.write("404 : File not found");
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

/**
    * Return all reservations
    * @return {object} Reservation object List.
*/
app.get('/api/reservations', (req, res) => {
    let filter = {};
    if(req.query.hotelName){
        filter.hotelname = req.query.hotelName;
    }
    if(req.query.arrivalDate){
        let formatedArrivalDate = new Date(req.query.arrivalDate);
        filter.arrivaldate = formatedArrivalDate.toLocaleDateString('en-US');
        
    }
    if(req.query.departureDate){
        let formatedDepartureDate = new Date(req.query.departureDate);
        filter.departuredate = formatedDepartureDate.toLocaleDateString('en-US');
    }
    
    let mongoObj = db.collection('reservations').find(filter); ///Find returns cursor (Mongo object)
    
    mongoObj.toArray((err, results) => {
        res.status(200).json(results);
    });
});

/**
    * Return reservation filter by ID
    * @param {number} id - reservation id.
    * @return {object} Reservation object with given ID.
*/
app.get('/api/reservation/:id', (req, res) => {
    if(!req.params.id || isNaN(Number(req.params.id))) {
        return res.status(500).json('Id is not provided!');
    }

    console.log(req.params.id);
    let mongoObj = db.collection('reservations').findOne({'_id': Number(req.params.id) }); ///Find returns cursor (Mongo object)
    
    if(mongoObj) {
        mongoObj.then((obj) => {
            res.status(200).json(obj);
        });
    }
    else{
        res.status(200).json({});
    }
});

/**
    * Create New reservation
    * @param {string} name - reservation guest name.
    * @param {string} hotelname - reservation hotel name.
    * @param {date} arrivaldate - reservation arrivaldate.
    * @param {date} departuredate - reservation departuredate.
    * @return {Number} ID of the New reservation 
*/
app.post('/api/reservation', (req, res) => {
    let jsonObject = req.body;
    if(!jsonObject) {
        return res.status(500).json('Error accord!');
    }

    let formatedArrivalDate = new Date(jsonObject.arrivaldate);
    let formatedDepartureDate = new Date(jsonObject.departuredate);
    db.collection('reservations').count().then((obj) => {
        currentId = Number(obj) + 1;
        db.collection('reservations').save({
            _id: currentId,
            name: jsonObject.name,
            hotelname: jsonObject.hotelname,
            arrivaldate: formatedArrivalDate.toLocaleDateString('en-US'),
            departuredate: formatedDepartureDate.toLocaleDateString('en-US')
        }, (err, result) => {
            return res.status(200).json(currentId);
        });
    });
    
});

/**
    Connect to Mongo DB Client and initialize express server with current port
*/
mongoClient.connect(url, function(err, database) {
    if (err) throw err;
    console.log("Database Connected!");
    db = database;
    app.listen(port, () => {
        console.log(`Server is listen port : ${port}`);
    });
});