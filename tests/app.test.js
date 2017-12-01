const assert = require('assert');
const request = require('request');
const config = require('../config.js').get(String(process.env.NODE_ENV));

let url = `${config.domain}api/reservation`;

/*
    Create reservation test
*/
describe('POST /api/reservation', done => {
   let data = [];

   /* Initial set up method to be executed before every 'it' block executes */
   beforeEach(done => {
      request(url, (err, res, body) => {
         if (err) throw error;
         assert.equal(res.statusCode, 200, 'Get call returned successfully!');
         data = JSON.parse(body);
         done();
      });
   });

   /* Valid TEST : Validate create of reservation if all the feilds are currectly passed to API. */
   it('Given a HotelName, Guest Name, Arrival Date and Departure Date, validate new reservation details saved properly in DB', done => {
      request.post(
         {
            headers: { 'content-type': 'application/json' },
            url: url,
            body: JSON.stringify({
               name: `Guest ${data.length + 1}`,
               hotelname: `New HOTEL ${data.length + 1}`,
               arrivaldate: '2017-12-07',
               departuredate: '2017-12-22',
            }),
         },
         function(err, res, body) {
            if (err) throw error;
            assert.equal(
               res.statusCode,
               200,
               'Reservation created successfully!'
            );
            assert.equal(
               body,
               data.length + 1,
               'Create reservation data validated successfully'
            );
            done();
         }
      );
   });

   /* Invalid TEST case : Validates create should not add new reservation as Date is not provided in current format. */
   it('Given an Invalid date, validate new reservation details not saved in DB', done => {
      request.post(
         {
            headers: { 'content-type': 'application/json' },
            url: url,
            body: JSON.stringify({
               name: `Guest ${data.length + 1}`,
               hotelname: `New HOTEL ${data.length + 1}`,
               arrivaldate: '201T-12-07', // Invalid date
               departuredate: '2017-12-22',
            }),
         },
         function(err, res, body) {
            if (err) throw error;
            assert.equal(
               res.statusCode,
               500,
               'Reservation not saved successfully due to invalid arrival date!'
            );
            done();
         }
      );
   });

   /* Invalid TEST case : Validates create should not add new reservation as Hotel Name is not provided. */
   it('Given an invalid Hotel name date, validate new reservation details not saved in DB', done => {
      request.post(
         {
            headers: { 'content-type': 'application/json' },
            url: url,
            body: JSON.stringify({
               name: `Guest ${data.length + 1}`,
               hotelname: undefined, // Invalid hotel name
               arrivaldate: '2017-12-07',
               departuredate: '2017-12-22',
            }),
         },
         function(err, res, body) {
            assert.equal(
               res.statusCode,
               500,
               'Reservation not saved successfully due to invalid hotel name provided!'
            );
            done();
         }
      );
   });

   /* Invalid TEST case : Validates create should not add new reservation as Guest name is blank. */
   it('Given an Invalid guest name, validate new reservation details not saved in DB', done => {
      request.post(
         {
            headers: { 'content-type': 'application/json' },
            url: url,
            body: JSON.stringify({
               name: '', // Invalid name
               hotelname: `Another HOTEL ${data.length + 1}`,
               arrivaldate: '2017-12-07',
               departuredate: '2017-12-22',
            }),
         },
         function(err, res, body) {
            assert.equal(
               res.statusCode,
               500,
               'Reservation not saved successfully due to invalid guest name provided!'
            );
            done();
         }
      );
   });
});

/* GET call for retriving all reservations in DB */
describe('GET /api/reservation', () => {
    /* Positive Test : Test to check get call. */
    it('Get all entities from reservation route', done => {
        request(url, (err, res, body) => {
            assert.equal(res.statusCode, 200, 'Get call returned successfully!');
            let data = JSON.parse(body);
            assert.equal(data.length > 0, true, 'Get call returned result successfully');
            done();
        });
    });
});

/*
    Get call to fetch perticular reservation based on ID
*/
describe('GET /api/reservation/{id}', done => {
    let data = [];
    let randomNumber = 0;
    /* Initial set up method to be executed before 'it' block executes */
    before(done => {
        request(url, (err, res, body) => {
            if (err) throw error;
            assert.equal(res.statusCode, 200, 'Get call returned successfully!');
            data = JSON.parse(body);
            randomNumber = Math.floor(Math.random() * data.length);
            done();
        });
    });

    /* Valid TEST case : Validates get by ID call*/
    it('Given a list of reservation, validate the details for the reservation for which ID is provided.', done => {
        let expected = data[randomNumber - 1];
        request(`${url}/${randomNumber}`, (err, res, body) => {
            if (err) throw error;
            let actual = JSON.parse(body);
            assert.equal(res.statusCode, 200, 'Get call returned successfully!');
            assert.deepEqual(
                actual,
                expected,
                `Data returned from get by ID for ${randomNumber} is valid`
            );
            done();
        });
    });
});
