/* The code is importing the `mongoose` library, which is a popular Object Data Modeling (ODM) library
for MongoDB and Node.js. It is used to interact with MongoDB databases and provides a simple and
flexible way to define schemas, perform CRUD operations, and handle database connections. */
// Import the mongoose library
const mongoose = require('mongoose')
require('dotenv').config()

/**
 * Connects to the MongoDB database.
 * @param {string} url - The MongoDB connection URL.
 * @returns {Promise} - A promise that resolves when the connection is successful.
 *                      Rejects with an error if the connection fails.
 */
mongoose.connect(process.env.CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser:true})
    .then(() => {
        // Connection successful
        console.log('Database connect success')
    })
    .catch((err) => {
        // Connection failed
        console.log('Database connect not success')
        console.log(err)
    })

// Export the mongoose object
module.exports = mongoose
