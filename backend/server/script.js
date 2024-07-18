const mongoose = require('mongoose');
const express = require('express');
const fetch = require('node-fetch');
const cron = require('node-cron');
const app = express();
const Coin = require('./model/coin');
const cors = require('cors');

app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://nitin:Nitin123@cluster0.wwsnzjl.mongodb.net/")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Schedule fetching and saving data
cron.schedule('* * * * *', async () => {
  try {
    const raw = JSON.stringify({
      "currency": "USD",
      "sort": "rank",
      "order": "ascending",
      "offset": 0,
      "limit": 2,
      "meta": false
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "4daae8b5-bd1e-412b-8304-e425ebae0cc3"
      },
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch("https://api.livecoinwatch.com/coins/list", requestOptions);
    let result = await response.json();

    // Save data to MongoDB
    await Coin.deleteMany({}); // Clear existing data
    await Coin.insertMany(result);

    console.log('Data updated successfully.');
  } catch (err) {
    console.error('Error updating data:', err);
  }
});

// API endpoint to fetch data
app.get('/api/coins', async (req, res) => {
  try {
    const coins = await Coin.find().limit(10); // Fetch top 10 coins
    res.status(200).json(coins);
  } catch (err) {
    console.error('Error fetching coins:', err);
    res.status(500).send('Error fetching coins.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
