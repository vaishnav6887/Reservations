const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser'); // Need after express 4.0 version to parse body of a request 
const app = express(); /// Initialize express server
app.use(bodyParser.json()); // To support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // To support encoded bodies

/* Load Route for Reservation */
var reservation_routes = require('./routes/reservations.js');

/* Get current configuration */
const config = require('./config.js').get(String(process.env.NODE_ENV));

/* Current port at which express server will be serving request */
const port = config.port; 

/* serve static index HTML page. */
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

/* Set up the routes */
app.use('/api/reservation', reservation_routes);

/* initialize express server with current port */
app.listen(port, () => {
    console.log(`Server is listen port : ${port}`);
});