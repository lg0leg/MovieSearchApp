const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

const TMDB_KEY = process.env.REACT_APP_TMD_API_KEY;

const fetchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_KEY}`,
  },
};

app.get(`/express_backend`, async (req, res) => {
  try {
    const query = req.url.replace('/express_backend?q=', '');
    let resp = await fetch(query, fetchOptions);
    let data = await resp.json();
    res.send({ data: data });
  } catch (error) {
    res.status(500).json({ error });
  }
  // res.send({ data: req.url });
});
