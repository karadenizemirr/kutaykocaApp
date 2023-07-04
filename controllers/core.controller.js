const getStationWithWeb = require('../modules/stationScrape')
const Stations = require('../models/station.model')
const getClosestStops = require('../modules/createRotation')
const createError = require('http-errors')
const {spawn} = require('child_process')


/**
 * Retrieves the location information based on the request method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The location information or an error message.
 */
/**
 * The getLocation function is an asynchronous function that handles POST and GET requests, calculates
 * the distance to the closest stops based on the provided location, and returns the result or an error
 * message.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method (e.g., GET, POST), request headers, request body,
 * and other relevant details.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code, it is used to send JSON responses with the `res.status(
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to handle errors or to move on to the
 * next middleware function after completing a specific task.
 */
const getLocation = async (req,res,next) => {

    try{
        if (req.method === 'POST'){
        
            let data = req.body
    
            if (data.location){
    
                //const distance = await getClosestStops(data.location)
                let distance;
                const getAllCoordinates = await Stations.find()

                const send_data = {
                    "location": data.location,
                    "allCoordinates": getAllCoordinates
                }
                // Data Send Python 
                const pythonProcess = spawn('python3', ['pythonAPI/distance.py'])
                pythonProcess.stdin.write(JSON.stringify(send_data))
                pythonProcess.stdin.end()

                // Python Tarafından Gelen Veri
                pythonProcess.stdout.on('data', (data) => {
                    // Python'dan gelen çıktıyı konsola yazdırma
                    distance = JSON.parse(data.toString())
                    res.status(200).json({
                        "message": "distance calculate success",
                        "data": distance
                    })
                  });
                  
                  pythonProcess.stderr.on('data', (data) => {
                    // Hata çıktısını konsola yazdırma
                    console.error(data.toString());
                  });
                  
                  pythonProcess.on('close', (code) => {
                    console.log(`Python işlemi sonlandı, çıkış kodu: ${code}`);
                  });


                
    
            }else{
                throw createError(404, 'Distance calculate error')
            }
        }
        else if(req.method === 'GET'){
            res.status(404).json({
                "message": "Bad Request"
            })
        }
    }catch (err){
        next(err)
    }
}


/**
 * Retrieves station data from the database and saves it.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {void} No return value.
 */
/**
 * The function `getStation` retrieves data from a web source, saves it to a database, and returns a
 * success message.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request such as headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to control the response, such as setting
 * the status code, headers, and sending the response body.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to handle errors or to move on to the
 * next operation after the current one is completed. In this case, it is used to move on to the next
 */
const getStation = (req,res,next) => {
    
    // Database save operations
    try {
       getStationWithWeb()
        .then((result) => {
            // Save Data

            result.forEach(data => {
                
                Stations.create(data)
                    .then((saveRes) => {
                        console.log('Database save success')
                    })
                    .catch((err) => {
                        res.status(200).json({
                            "message": "Veriler güncel"
                        })
                    })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }catch (err){
        cconsole.log(err)
    }

}

const home = (req,res) => {
    res.status(200).json({
        "message": "KutayKoca Backend APP"
    })
}
module.exports = {
    getLocation,
    getStation,
    home
}