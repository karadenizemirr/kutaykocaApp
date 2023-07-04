/* The code is defining a Mongoose schema for a location. */
const mongoose = require('mongoose')

// Define the location schema
const locationSchema = new mongoose.Schema({
    name: {
        type: String, // Name of the location
        required: true // Required field
    },
    coordinates: {
        type: String // Coordinates of the location
    }
})

// Create the Locations model using the location schema
const Locations = mongoose.model('Location', locationSchema)

// Export the Locations model
module.exports = Locations
