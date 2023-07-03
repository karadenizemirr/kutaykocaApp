import math

def calculateDistance(lat1, lon1, lat2, lon2):
    """
    Calculates the distance between two points on the Earth's surface using the Haversine formula.

    Parameters:
        lat1 (float): Latitude of the first point in degrees.
        lon1 (float): Longitude of the first point in degrees.
        lat2 (float): Latitude of the second point in degrees.
        lon2 (float): Longitude of the second point in degrees.

    Returns:
        float: The distance between the two points in kilometers.
    """
    R = 6371  # Dünya yarıçapı (kilometre cinsinden)
    dLat = math.radians(lat2 - lat1)  # Enlem farkı
    dLon = math.radians(lon2 - lon1)  # Boylam farkı
    a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon / 2) * math.sin(dLon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c  # İki nokta arasındaki mesafe

    return distance

def getClosestStops(data):
    """
    Returns the closest station to the user's location based on latitude and longitude.

    Parameters:
        data (dict): A dictionary containing the user's location and all available coordinates.

    Returns:
        dict: A dictionary containing the name, latitude, longitude, and distance of the closest station.
    """
    # Tüm Koordinatları Al
    getAllCoordinates = data['allCoordinates']
    userCoordinates = data['location']

    closestStation = None
    minDistance = float('inf')

    for station in getAllCoordinates:
        distance = calculateDistance(
            lat1=float(userCoordinates['latitude']),
            lon1=float(userCoordinates['longitude']),
            lat2=float(station['mapLat']),
            lon2=float(station['mapLong'])
        )

        if distance < minDistance:
            closestStation = station
            minDistance = distance
        

    result = {
        "name": closestStation['name'],
        "latidute": closestStation['mapLat'],
        "longitude": closestStation['mapLong'],
        "distance": round(minDistance, 2)
    }


    return result