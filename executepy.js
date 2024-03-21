// const { exec } = require("child_process");

// const executepy = (filepath) => {
//     return new Promise((resolve, reject) => {
//         exec(
//             `python -u "${filepath}"`,
//             (error, stdout, stderr) => {
//                 if (error || stderr) {
//                     reject({ error, stderr });
//                 } else {
//                     resolve(stdout);
//                 }
//             }
//         );
//     });
// }

// module.exports = {
//     executepy,
// };
const { exec } = require("child_process");

const executepy = (filepath) => {
    const command = `python -u "${filepath}"`;
    
    console.log("Executing command:", command);

    return new Promise((resolve, reject) => {
        exec(
            command,
            (error, stdout, stderr) => {
                if (error || stderr) {
                    reject({ error, stderr });
                } else {
                    resolve(stdout);
                }
            }
        );
    });
};

module.exports = {
    executepy,
};
