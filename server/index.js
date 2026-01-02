const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.json({ message: 'Database connection successful!', time: result.rows[0].now });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Database connection error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});