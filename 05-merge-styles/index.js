const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (error) => {
  if (error) return console.error(error.message);
});

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  if (error) return console.error(error.message);
  for (const file of files) {
    if (path.extname(file.name) === '.css') {
      let fileName = file.name;
      addStyles(fileName);
    }
  }
});

const addStyles = (name) => {
  fs.readFile(path.join(__dirname, 'styles', name), (error, data) => {
    if (error) return console.error(error.message);
    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data.toString(), (error) => {
      if (error) return console.error(error.message);
    });
  });
};
