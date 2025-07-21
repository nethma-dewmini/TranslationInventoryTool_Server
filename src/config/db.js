// Responsible for establishing and exporting MongoDB connection
//db.js
const mongoose = require('mongoose');
const { mongoURI } = require('./config');

// Exit code for fatal DB errors
const DB_EXIT_CODE = 1;

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(DB_EXIT_CODE);
    }
}

module.exports = connectDB;