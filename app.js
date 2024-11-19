// Import required modules
const express = require('express');
const path = require('path');
const routes = require('./route/routes');

const app = express();

// Middleware
app.use(express.json());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For parsing POST request body


// Routes
app.use('/', routes);

// Start the server
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
