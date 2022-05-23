const fs = require('fs');
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');
const originStylesPath = path.join(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

fs.mkdir(projectDistPath, {recursive: true}, error => {
  if (error) return console.error(error.message);
  createFile('index.html');
  createFile('style.css');
  addHtml();
});

const createFile = (fileName) => {
  fs.writeFile(`${projectDistPath}/${fileName}`, '', (error) => {
    if (error) return console.error(error.message);
  });
};

fs.readdir(originStylesPath, { withFileTypes: true }, (error, files) => {
  if (error) return console.error(error.message);
  for (const file of files) {
    if (path.extname(file.name) === '.css') {
      addStyles(file.name);
    }
  }
});

const addStyles = (fileName) => {
  fs.readFile(`${originStylesPath}/${fileName}`, (error, data) => {
    if (error) return console.error(error.message);
    fs.appendFile(`${projectDistPath}/style.css`, data.toString(), (error) => {
      if (error) return console.error(error.message);
    });
  });
};

fs.rm(`${projectDistPath}/assets`, {recursive: true, force: true}, error => {
  if (error) return console.error(error.message);
  copyDir('assets');
});

const copyDir = (name) => {
  fs.mkdir(`${projectDistPath}/assets`, {recursive: true}, (error) => {
    if (error) return console.error(error.message);
  });
  fs.readdir(path.join(__dirname, name), {withFileTypes: true}, (error, files) => {
    if (error) return console.error(error.message);
    for (const elem of files) {
      if (elem.isFile()) {
        fs.copyFile(path.join(__dirname, name, elem.name), `${projectDistPath}/${name}/${elem.name}`, error => {
          if (error) return console.error(error.message);
        });
      } else {
        fs.mkdir(`${projectDistPath}/${name}/${elem.name}`, {recursive: true}, (error) => {
          if (error) return console.error(error.message);
        });
        copyDir(`${name}/${elem.name}`);
      }
    }
  });
};

const addHtml = () => {
  fs.readFile(templatePath, (error, data) => {
    if (error) return console.error(error.message);
    let htmlStr = data.toString();
   
    fs.readdir(componentsPath, (error, files) => {
      if (error) return console.error(error.message);
      for (const file of files) {

        fs.readFile(`${componentsPath}/${file}`, (error, data) => {
          if (error) return console.error(error.message);
          let tagToReplace = path.basename(file, path.extname(file));
          if (htmlStr.includes(`{{${tagToReplace}}}`)) {
            htmlStr = htmlStr.replace(`{{${tagToReplace}}}`, data.toString());
          }

          fs.writeFile(`${projectDistPath}/index.html`, htmlStr, (error) => {
            if (error) return console.error(error.message);
          });
        });
      }
    });
  });
};








