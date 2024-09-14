const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alireza1995!',
    database: 'gambling',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

router.post('/', async (req, res) => {
    const { email, password, location, username } = req.body;

    try {

        if (!isValidUsername(username)) {
            return res.status(400).json({ error: 'username must be at least 10 characters long' });
        }

        const [existingUser2] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser2.length > 0) {
            return res.status(400).json({ error: 'Username is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const token = generateRandomToken();

        await pool.query('INSERT INTO users (id, email, password_hash, location, username) VALUES (?, ?, ?, ?, ?)', [token, email, hashedPassword, location, username]);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});