const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const outputFile = path.join(__dirname, 'outputFile.txt');
const writeableStream = fs.createWriteStream(outputFile);

readline.write(`Hello, enter text\n`);

readline.on('line', data => {
  if (data === 'exit') {
    readline.close();
    writeableStream.end();
  } else {
    writeableStream.write(data +'\n');
  }
})

const goodbye = () => {
  console.log('Goodbye');
  writeableStream.end();
}

process.on('exit', goodbye);
process.on('SIGINT', goodbye);

