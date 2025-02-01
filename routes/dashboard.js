const express = require('express');
const router = express.Router();

// Middleware to check session and pass user to views
router.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Makes user available in all EJS views
    next();
});

// Dashboard Home Route
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('dashboard/index', { user: req.session.user });
});

// Login Page
router.get('/login', (req, res) => {
    res.render('dashboard/auth/login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('dashboard/auth/register');
});

module.exports = router;
