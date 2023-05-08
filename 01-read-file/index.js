const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readableStream.on('data', data => stdout.write(data));