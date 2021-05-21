const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();
app.get('/',(req,res) => res.send('Welcome'))
app.get('/api',(req,res) => res.send('Api running'))

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/logout',require('./routes/api/logout'));
app.use('/api/question',require('./routes/api/question'));

module.exports = app;
