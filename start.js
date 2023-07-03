const { exec } = require("child_process");

const nodeCommand = "node src/index.js";

try {
    const process = exec(nodeCommand);
    process.on("close", (code) => {
        console.log(`Child process exited with code ${code}`);
    });
} catch (error) {
    console.error(error);
}