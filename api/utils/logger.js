const fs = require('fs');
const util = require('util');

const fileLog = fs.createWriteStream('./server.log', { flags: 'a' });
const logOutput = process.stdout;

console.log = (e) => {
  fileLog.write(util.format(e) + '\n');
  logOutput.write(util.format(e) + '\n');
};

module.exports = { console };
