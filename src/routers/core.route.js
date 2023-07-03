/* The code is importing two functions, `getLocation` and `getStation`, from the
"../controllers/core.controller" file. These functions are then used to define routes for the
Express app object. */
const {getLocation, getStation} = require("../controllers/core.controller")


/**
 * Registers the core routes for the application.
 *
 * @param {Object} app - The Express app object.
 */
const coreRouter = (app) => {
    app.get('/api/getLocation', getLocation)
    app.post('/api/getLocation', getLocation)

    // Station Routes
    app.get('/api/getStation',getStation)
}

module.exports = coreRouter
