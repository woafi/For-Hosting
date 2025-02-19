const express = require('express');
const app = express();
const path = require('path');
const fs = require ('fs')
const PORT = 3000 || process.env.port
let arraysongs = []

app.use(express.static('public'));

const folderPathsong = path.join(__dirname, 'public', 'songs');

fs.readdir(folderPathsong, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter out only files (excluding directories)
  const songFiles = files.filter(file => {
    const filePath = path.join(folderPathsong, file);
    return fs.statSync(filePath).isFile();
  });

  // Print the names of the song files
  console.log('List of songs:');
  songFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
    arraysongs.push(file)
  });
});


app.get('/getData', (req, res) => {
      res.json(arraysongs);
  });
  
  app.get('/', (req, res) => {
    res.sendFile('index.html', {root:__dirname});
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port 3000`)
})