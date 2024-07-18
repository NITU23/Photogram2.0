import fetch from 'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
  try {
    const requestData = {
      currency: 'USD',
      sort: 'rank',
      order: 'ascending',
      offset: 0,
      limit: 2,
      meta: false
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eca10fd1-3bf8-4fd2-a696-1fdb73f469b8'
      },
      body: JSON.stringify(requestData)
    };

    const response = await fetch('https://api.livecoinwatch.com/coins/list', requestOptions);
    console.log('e',response)


    const result = await response.json();

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching coins:', err);
    res.status(500).send('Error fetching coins.');
  }
});

const PORT = 5000;

app.listen(PORT, async () => {
  try {
    await mongoose.connect('mongodb+srv://nitin:Nitin123@cluster0.wwsnzjl.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});
