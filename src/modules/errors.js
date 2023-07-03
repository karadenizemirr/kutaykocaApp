/**
 * The errorHandler function is a middleware function in JavaScript that handles errors by sending a
 * JSON response with the error code and message.
 * @param err - The err parameter is the error object that is passed to the errorHandler function. It
 * contains information about the error that occurred, such as the error message and status code.
 * @param req - The `req` parameter represents the HTTP request object. It contains information about
 * the incoming request such as the request headers, request parameters, request body, etc.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to manipulate the response, such as
 * `res.json()` which is used to send a JSON response.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when there is an error and you want to
 * pass the error to the next error-handling middleware function.
 */
const errorHandler = (err,req,res,next) => {

    res.json({
        "code": err.status_code,
        "message": err.message
    })

}

module.exports = errorHandler
