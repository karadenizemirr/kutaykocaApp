import sys
import math
import analysis
import json

def read_data_from_nodejs():
    """
    Read data from Node.js stdin.

    Returns:
        str: The data read from stdin.
    """
    data = sys.stdin.readline()
    return data

def convert_data_to_json(data):
    """
    Convert data to JSON format.

    Args:
        data (str): The data to convert.

    Returns:
        dict: The data in JSON format.
    """
    json_data = json.loads(data)
    return json_data

def calculate_distance(json_data):
    """
    Calculate the closest stops for the given JSON data.

    Args:
        json_data (dict): The JSON data.

    Returns:
        list: The closest stops.
    """
    distance = analysis.getClosestStops(json_data)
    return distance

def send_data_to_nodejs(distance):
    """
    Send data to Node.js stdout.

    Args:
        distance (list): The data to send.
    """
    sys.stdout.write(json.dumps(distance))
    sys.stdout.flush()

# Read data from Node.js
data = read_data_from_nodejs()

# Convert data to JSON
json_data = convert_data_to_json(data)

# Calculate distance
distance = calculate_distance(json_data)

# Send data to Node.js
send_data_to_nodejs(distance)
