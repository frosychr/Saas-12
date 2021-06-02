const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');

// view engine
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));

app.use(cors());

// Connect Database
connectDB();
// Init Middleware
app.use(express.json());

app.use('/api/perday', require('./routes/api/perday'));


app.listen(4003, () => {
    console.log('Listening on 4003');
});
