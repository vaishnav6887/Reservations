const mongoClient = require('mongodb').MongoClient;

const config = require('../config.js').get(String(process.env.NODE_ENV));
var businessLogic = require('../businesslogic/reservationBO.js');
var url = config.database;
var db;

/**
 * Return all reservations
 * @return {object} Reservation object List.
 */
exports.getAll = (req, res) => {
   businessLogic.getAllReservations(req, res, db);
};

/**
 * Return reservation filter by ID
 * @param {number} id - reservation id.
 * @return {object} Reservation object with given ID.
 */
exports.getById = (req, res) => {
   businessLogic.getByReservationID(req, res, db);
};

/**
 * Create New reservation
 * @param {string} name - reservation guest name.
 * @param {string} hotelname - reservation hotel name.
 * @param {date} arrivaldate - reservation arrivaldate.
 * @param {date} departuredate - reservation departuredate.
 * @return {Number} ID of the New reservation
 */
exports.create = (req, res) => {
   businessLogic.createReservation(req, res, db);
};

mongoClient.connect(url, function(err, database) {
   if (err) throw err;
   console.log('Database Connected!');
   db = database;
});
