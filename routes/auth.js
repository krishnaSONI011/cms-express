const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt'); // Ensure passwords are hashed
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        db.query('SELECT * FROM users WHERE user_email = ?', [email], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            if (result.length === 0) {
                return res.send('Invalid email or password'); // No user found
            }

            const user = result[0];

            // Check password (Use bcrypt if stored passwords are hashed)
            const isPasswordValid = password === user.user_password; // Use bcrypt.compare(password, user.user_password) if hashed

            if (!isPasswordValid) {
                return res.send('Invalid email or password'); // Incorrect password
            }

            // Set session
            req.session.user = {
                id: user.id,
                username: user.user_name,
                email: user.user_email,
            };

            res.redirect('/dashboard'); // Redirect after setting session
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, nickname } = req.body;

        if (!name || !email || !password || !nickname) {
            return res.status(400).send('All fields are required');
        }

        const hashpass = password; // Use bcrypt.hash(password, 10) if hashing

        db.query('SELECT * FROM users WHERE user_email = ?', [email], (err, result) => {
            if (result.length > 0) {
                return res.send('Email is already registered');
            }

            db.query(
                'INSERT INTO users (user_name, user_email, user_nikname, user_password) VALUES (?,?,?,?)',
                [name, email, nickname, hashpass],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.send('User already exists or database error');
                    }
                    res.redirect('/auth/login');
                }
            );
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
