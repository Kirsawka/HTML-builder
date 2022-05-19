const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', (error) => {
  if (error) return console.error(error.message);
});

stdout.write('Привет! Введите текст:\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Удачи в изучении Node.js!');
    process.exit();
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
    if (err) return console.error(err.message);
  });
});

process.on('SIGINT', () => {
  stdout.write('Удачи в изучении Node.js!');
  process.exit();
});