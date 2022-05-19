const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (error, files) => {
    if (error) return console.error(error.message);
    for (const file of files) {
      if (file.isFile()) {
        (async () => {
          try {
            await fsPromises.stat(path.join(__dirname, 'secret-folder'));
            const stats = await fsPromises.stat(
              path.join(__dirname, 'secret-folder', file.name)
            );
            let fileSize = (stats.size / 1024).toFixed(2) + 'kb';
            console.log(path.basename(file.name, path.extname(file.name)) + ' - ' + path.extname(file.name).slice(1) + ' - ' + fileSize);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }
);
