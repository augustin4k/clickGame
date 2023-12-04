const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(multer().none()); // Parse only application/x-www-form-urlencoded
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const jsonFilePath = 'db.json';

let players = [];
if (fs.existsSync(jsonFilePath)) {
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  players = JSON.parse(data);
}

app.post('/addPlayer', (req, res) => {
  const { name, score, time } = req.body;

  players.push({ name, score, time });

  fs.writeFileSync(jsonFilePath, JSON.stringify(players, null, 2), 'utf-8');

  res.json({ success: true, message: 'Player added successfully.' });
});

app.get('/topPlayers', (req, res) => {
  let sortedPlayers = players.sort((a, b) => a.time - b.time);

  if (sortedPlayers.length > 4) {
      let sortedPlayers = sortedPlayers.slice(0, 5);
  }

  res.json(sortedPlayers);
});

// Define a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

