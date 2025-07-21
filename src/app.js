const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/requireAuth');

//express app
const app = express();

//middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(cookieParser());

//public routes
app.use('/api/auth', authRoutes);

//protected routes
app.use('/api/users', requireAuth, userRoutes);