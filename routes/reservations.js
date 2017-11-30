const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const router = express.Router();

app.use(bodyParser.json()); // To support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // To support encoded bodies

var reservation_controller = require('../controllers/reservationcontroller');

/**
    * Return all reservations
    * @return {object} Reservation object List.
*/
router.get('/', reservation_controller.getAll);

/**
    * Return reservation filter by ID
    * @param {number} id - reservation id.
    * @return {object} Reservation object with given ID.
*/
router.get('/:id', reservation_controller.getById);

/**
    * Create New reservation
    * @param {string} name - reservation guest name.
    * @param {string} hotelname - reservation hotel name.
    * @param {date} arrivaldate - reservation arrivaldate.
    * @param {date} departuredate - reservation departuredate.
    * @return {Number} ID of the New reservation 
*/
router.post('/', reservation_controller.create);

module.exports = router;