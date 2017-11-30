/**
    * Return all reservations
    * @return {object} Reservation object List.
*/
exports.getAllReservations = (req, res, db) => {
	let filter = {};
	if (req.query.hotelName) {
		filter.hotelname = req.query.hotelName;
	}
	if (req.query.arrivalDate) {
		let formatedArrivalDate = new Date(req.query.arrivalDate);
		filter.arrivaldate = formatedArrivalDate.toLocaleDateString('en-US');

	}
	if (req.query.departureDate) {
		let formatedDepartureDate = new Date(req.query.departureDate);
		filter.departuredate = formatedDepartureDate.toLocaleDateString('en-US');
	}

	let mongoObj = db.collection('reservations').find(filter); ///Find returns cursor (Mongo object)

	mongoObj.toArray((err, results) => {
		res.status(200).json(results);
	});
}

/**
    * Return reservation filter by ID
    * @param {number} id - reservation id.
    * @return {object} Reservation object with given ID.
*/
exports.getByReservationID = (req, res, db) => {
	if (!req.params.id || isNaN(Number(req.params.id))) {
		return res.status(500).json('Id is not provided!');
	}

	let mongoObj = db.collection('reservations').findOne({ '_id': Number(req.params.id) }); ///Find returns cursor (Mongo object)

	if (mongoObj) {
		mongoObj.then((obj) => {
			res.status(200).json(obj);
		});
	}
	else {
		res.status(200).json({});
	}
}

/**
    * Create New reservation
    * @param {string} name - reservation guest name.
    * @param {string} hotelname - reservation hotel name.
    * @param {date} arrivaldate - reservation arrivaldate.
    * @param {date} departuredate - reservation departuredate.
    * @return {Number} ID of the New reservation 
*/
exports.createReservation = (req, res, db) => {
	let jsonObject = req.body;
	if (!jsonObject || jsonObject.name === '' || jsonObject.hotelname === '') {
		return res.status(500).json('There is an error!');
	}

	let formatedArrivalDate = new Date(jsonObject.arrivaldate);
	let formatedDepartureDate = new Date(jsonObject.departuredate);

	//Validation for date time.
	if (!validateDate(formatedArrivalDate) || !validateDate(formatedDepartureDate)) {
		return res.status(500).json('Invalid date!');
	}

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
}

var validateDate = (inputDate) => {
	let parseTime = Date.parse(inputDate);
	if (!isNaN(parseTime)) {
		return true;
	}
	return false;
}