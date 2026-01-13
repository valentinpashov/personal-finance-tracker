const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Registration and Login Endpoints
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // User Input Validation
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(401).json({ message: 'Този имейл вече съществува!' });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert New User into Database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    // Generate JWT Token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: newUser.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // User Input Validation
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Грешен имейл или парола!' });
    }

    // Check if the password matches 
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Грешен имейл или парола!' });
    }

    // Generate JWT Token (This is the personal ID)
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email } });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Edit Transaction
app.get('/transactions/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    
    
    const allTransactions = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC, id DESC", 
      [user_id]
    );
    
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//  Add Transaction
app.post('/transactions', async (req, res) => {
  try {
    const { user_id, description, amount, type, category, date } = req.body;

    const newTransaction = await pool.query(
      "INSERT INTO transactions (user_id, description, amount, type, category, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, description, amount, type, category, date]
    );

    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete Transaction
app.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTransaction = await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
    res.json("Транзакцията е изтрита!");
  } catch (err) {
    console.error(err.message);
  }
});

// Edit Transaction
app.put('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    
    const updateTransaction = await pool.query(
      "UPDATE transactions SET description = $1, amount = $2, category = $3 WHERE id = $4",
      [description, amount, category, id]
    );
    
    res.json("Транзакцията е обновена!");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});