const fs = require('fs');
const path = require('path');
const { copyFile } = require('fs/promises');
const { mkdir } = require('fs/promises');
const { readdir } = require('fs/promises');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

fs.promises.rm(destDir, {recursive: true, force: true})
	.then(() => mkdir(destDir, {recursive: true}))
	.then(() => readdir(srcDir, {withFileTypes: true}))
	.then(files => {
		files.forEach(file => {
			if (file.isDirectory()) {
				copyDir(srcDir + path.sep + file.name, destDir + path.sep + file.name);
			} else {
				copyFile(srcDir + path.sep + file.name, destDir + path.sep + file.name);
			}
		})
	});
