const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'files-copy'), (error, files) => {
  if (error) {
    fs.mkdir(path.join(__dirname, 'files-copy'), (error) => {
      if (error) return console.error(error.message);
    });
    copyDir();
  } else {
    for (const file of files) {
      fs.unlink(path.join(__dirname, 'files-copy', file), error => {
        if (error) return console.error(error.message);
      });
    }
    copyDir();
  }
});

const copyDir = () => {
  fs.readdir(path.join(__dirname, 'files'), (error, files) => {
    if (error) return console.error(error.message);
    for (const file of files) {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), error => {
        if (error) return console.error(error.message);
      });
    }
  });
};