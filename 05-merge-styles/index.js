const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');

const styles = path.join(__dirname, 'styles');

readdir(styles, {withFileTypes: true})
  .then(files => {
    let promisesArr = [];

    files.forEach(file => {
      let extname = path.extname(file.name);
      if (file.isDirectory() || extname !== '.css') {
        return;
      }
      let promise = readFile(styles + path.sep + file.name);
      promisesArr.push(promise);
    })

    Promise.all(promisesArr).then(filesData => {
      const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
      const writeStream = fs.createWriteStream(bundle);

      filesData.forEach(data => {
        writeStream.write(data);
      })
    })
  })