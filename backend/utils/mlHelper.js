// backend/utils/mlHelper.js

const { spawn } = require('child_process');
const path = require('path');

/**
 * Calls Python ML script to get prediction for water data
 * @param {Object} data - Water data object
 * @returns {Promise<Object>} - Prediction result
 */
const getPrediction = (data) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(__dirname, '../models/predict.py'); // Python script path

    // Spawn Python process
    const pyProcess = spawn('python', [pythonScriptPath, JSON.stringify(data)]);

    let result = '';
    let errorOutput = '';

    pyProcess.stdout.on('data', (chunk) => {
      result += chunk.toString();
    });

    pyProcess.stderr.on('data', (chunk) => {
      errorOutput += chunk.toString();
    });

    pyProcess.on('close', (code) => {
      if (code !== 0 || errorOutput) {
        console.error('Python ML error:', errorOutput);
        return reject(new Error('ML prediction failed'));
      }
      try {
        const parsedResult = JSON.parse(result); // Expect Python to return JSON string
        resolve(parsedResult);
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = { getPrediction };
