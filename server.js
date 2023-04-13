const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'getaquote')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'get-a-quote-calc.html'));
});

app.post('/get-distance', async (req, res) => {
  const { from, to } = req.body;
  const apiKey = 'AIzaSyCfW2ZTDz1tgFRrRumh1dnPil0cdWRfZ58'; // Replace with your own API key
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from}&destinations=${to}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const distance = data.rows[0].elements[0].distance.value;
      res.send({ distance: distance / 1609.344 }); // Convert meters to miles
    } else {
      res.status(400).send({ error: 'Failed to get distance' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});