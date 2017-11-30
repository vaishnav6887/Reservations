
var config = {
    dev: {
        database: "mongodb://reservationuser:admin123@ds042607.mlab.com:42607/reservations",
        port: 8080
    },
    default: {
        database: "mongodb://reservationuser:admin123@ds042607.mlab.com:42607/reservations",
        port: 8080
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}