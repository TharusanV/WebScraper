const { spawn } = require('child_process');
const path = require('path');

const runPythonScript = (url, targets) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../python/scraper.py');
        const python = spawn('python3', [scriptPath]);

        let output = '';
        let error = '';

        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.stderr.on('data', (data) => {
            error += data.toString();
        });

        python.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Python script failed with code ${code}: ${error}`));
            }

            //Try to parse the output string as JSON.
            try {
                resolve(JSON.parse(output));
            } 
            catch (err) {
                reject(new Error('Failed to parse Python output'));
            }
        });

        const payload = JSON.stringify({ url, targets });
        python.stdin.write(payload);
        python.stdin.end();
    });
};

module.exports = runPythonScript;

/*

2:
    - Node.js module for handling file paths in a cross-platform way. Ensures it works on Windows, Linux, macOS.

4:
    - Function returns a Promise, which is how we handle async operations (like waiting for Python to finish).

5:
    - A Promise is a container for a future value.
        - If Python succeeds → resolve(result)
        - If it fails → reject(error)

7:
    - spawn is a function from Node.js's built-in child_process module.
    - It allows you to run a command-line program (like Python) from your Node.js code.
    - Think of it like opening a terminal and typing: python3 scraper.py. 

9/10:
    - These strings will collect data sent back from Python's standard output and errors.

12:
    - stdout = “standard output” → the normal printed output from the Python script (e.g., print()).
    - This listens for data coming from the Python script and saves it in output.    


16:
    - stderr = “standard error” → this catches error messages from the Python script (e.g., stack traces).
    - It collects them into the error variable.   
    
20:
    - This runs when the Python script finishes.
    - code is the exit status: 0 = success, anything else = error.

34:
    - Prepares a JSON object to send to the Python script (via stdin).
    - It includes the URL and target selectors the scraper will use.

35/36:
    - Sends the JSON string into the Python script’s standard input (stdin).
    - This lets the Python script use input() or sys.stdin.read() to access it.

*/