const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
  files.forEach((file) => {
    if(!file.isDirectory()) {
      let extname = path.extname(file.name);
      let basename = path.basename(file.name, extname);

      fs.stat(folderPath + path.sep + file.name, (err, stats) => {
        console.log(`${basename} - ${extname.substring(1)} - ${(stats.size / 1024)}kb`);
      })
    }
  })
})