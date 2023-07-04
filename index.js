// Import required modules
/* The code `const express = require('express')` is importing the Express module, which is a web
application framework for Node.js. This allows us to use the functionalities provided by Express in
our application. */
const express = require('express')
const coreRouter = require('./routers/core.route')

// Create Express app
const app = express()

// Connect to database
/* `require('./modules/db')` is importing and executing the code in the `db.js` file located in the
`modules` directory. This code is responsible for connecting to the database. By requiring this
module, the server establishes a connection to the database before starting to listen for incoming
requests. */
require('./modules/db')

// Use JSON and URL-encoded middleware
/* `app.use(express.json({ strict: false }))` is a middleware function that parses incoming requests
with JSON payloads. It allows the server to accept JSON data in the request body and converts it
into a JavaScript object that can be accessed in the route handlers. */
app.use(express.json({ strict: false }))
app.use(express.urlencoded({ extended: true }))

// Mount coreRouter middleware
/* `coreRouter(app)` is mounting the `coreRouter` middleware onto the Express app. This means that any
requests that match the routes defined in the `coreRouter` will be handled by the middleware
functions defined in that router. */
coreRouter(app)

// Start server
/* `app.listen(3000, () => {
    console.log('listening on port 3000')
})` is starting the server and listening for incoming requests on port 3000. When a request is
received, the server will execute the callback function, which in this case logs the message
"listening on port 3000" to the console. */
app.listen(8080, () => {
    console.log('listening on port 3000')
})
