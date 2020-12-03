const request = require("request");
const fs = require('fs');

if (process.argv.length !== 4) process.exit();

const lineArgumentUrl = process.argv[2].toString();
const lineArgumentPath = process.argv[3].toString();


const fetcher = function (url, path) {
  request(url, (error, response, content) => {
    if (error) console.log("URL is unreachable, please check address and try again.");
    else {
      // console.log("statusCode", response && response.statusCode);
      fs.writeFile(path, content, (err) => {
        if (err) {
          if (err.errno === -2) {
            console.log("Path is INVALID")
          }
        } else {
          fs.stat(path, (error, stats) => {
            console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
          });
        }
      });
    }
  });
}

fetcher(lineArgumentUrl, lineArgumentPath);

