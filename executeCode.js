const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs")

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}


const executeCode = (filepath) => {
    const jobID = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobID}.exe`);
    console.log(jobID);
    console.log(outPath);
    console.log(outputPath);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && ${outPath}`, // Use the full path to the executable
            { cwd: outputPath }, // Set the current working directory
            (error, stdout, stderr) => {
                if (error || stderr) {
                    reject({ error, stderr });
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}

module.exports = {
    executeCode,
};
