const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['*'] 
}));


app.use(express.json());


app.post('/api/proxy', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
   
    const response = await axios.post('https://chimpu.online/api/post.php',
      new URLSearchParams({ phonenumber: phoneNumber }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );


    res.set({
      'Access-Control-Expose-Headers': Object.keys(response.headers).join(', '),
    });

    res.json({
      headers: response.headers,
      data: response.data
    });

  } catch (error) {
    console.error('Error making request:', error.message);
    res.status(500).json({ error: 'An error occurred while making the request.' });
  }
});


app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
