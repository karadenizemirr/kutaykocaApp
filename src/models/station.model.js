/* The code you provided is defining a Mongoose schema for a station and creating a model based on that
schema. */
const mongoose = require('mongoose')

// Define the station schema
const stationSchema = new mongoose.Schema({
    // Name of the station
    name: {
        type: String
        // Add any additional details about the name field here
    },
    // Longitude on the map
    mapLong: {
        type: String,
        // Add any additional details about the mapLong field here
    },
    // Latitude on the map
    mapLat: {
        type: String,
        // Add any additional details about the mapLat field here
    }
})

// Create the Stations model using the station schema
const Stations = mongoose.model('Station', stationSchema)

// Export the Stations model
module.exports = Stations
