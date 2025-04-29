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
