const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const session = require('express-session');

app.use(session({
    secret: 'cms-for-me',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set `true` if using HTTPS
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check authentication
function authenticate(req, res, next) {
    if (req.path === '/login') { 
        return next(); 
    }
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/dashboard/login');
    }
}


// Routes
app.use('/auth', authRoutes);
app.use('/dashboard',authenticate, dashboardRoutes); // Protects all dashboard routes

app.get('/', (req, res) => {
    res.render('index');
});

// Admin Route (Protected)
app.get('/admin', (req, res) => {
    res.redirect('/dashboard');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
