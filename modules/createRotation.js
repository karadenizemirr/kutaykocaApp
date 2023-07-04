const Stations = require('../models/station.model')

/**
 * The calculateDistance function calculates the distance between two points on the Earth's surface
 * using their latitude and longitude coordinates.
 * @param lat1 - The latitude of the first point.
 * @param lon1 - The parameter `lon1` represents the longitude of the first point.
 * @param lat2 - The parameter `lat2` represents the latitude of the second point.
 * @param lon2 - The parameter "lon2" represents the longitude of the second point.
 * @returns The function `calculateDistance` returns the distance between two points in kilometers.
 */
const calculateDistance = (lat1,lon1, lat2,lon2) => {
    const R = 6371; // Dünya yarıçapı (kilometre cinsinden)
    const dLat = (lat2 - lat1) * Math.PI / 180; // Enlem farkı
    const dLon = (lon2 - lon1) * Math.PI / 180; // Boylam farkı
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // İki nokta arasındaki mesafe
    
    return distance;
}

/**
 * The function `getClosestStops` takes user coordinates as input and returns the closest station's
 * name, latitude, longitude, and distance from the user.
 * @param userCoordinates - An object containing the latitude and longitude of the user's current
 * location.
 * @returns The function `getClosestStops` returns an object with the following properties:
 * - "name": the name of the closest station
 * - "latitude": the latitude of the closest station
 * - "longitude": the longitude of the closest station
 * - "distance": the distance between the user's coordinates and the closest station, rounded to 2
 * decimal places.
 */
const getClosestStops = async (userCoordinates) => {
    // Get All Coordinates
    const getAllCoordinates = await Stations.find()

    // Get Coordinate

    let closestStation
    let minDistance = Infinity

    for (let station of getAllCoordinates){
        let distance = calculateDistance(
            userCoordinates.latitude,
            userCoordinates.longitude,
            station.mapLat,
            station.mapLong
        )

        if (distance < minDistance){
            closestStation = station
            minDistance = distance
        }
    }

    result = {
        "name": closestStation.name,
        "latidute": closestStation.mapLat,
        "longitude": closestStation.mapLong,
        "distance": minDistance.toFixed(2)
    }

    
    return result

}

module.exports = getClosestStops