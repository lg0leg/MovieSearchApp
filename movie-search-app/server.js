const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

const TMDB_KEY = process.env.REACT_APP_TMD_API_KEY;

app.get('/express_backend', (req, res) => {
  res.send({ key: TMDB_KEY });
});
