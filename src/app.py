# This code is using the `subprocess` module in Python to run a Node.js script.
import subprocess

node_command = "node src/index.js"

try:
    process = subprocess.Popen(node_command, shell=True)
    process.wait()
except Exception as e:
    print(e)