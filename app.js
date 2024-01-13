require('dotenv').config(); // Import and configure dotenv at the top

const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

// Require the configuration and extract the development object
const dbConfig = require('./config/config.json').development;

const app = express();
const port = process.env.PORT || 3002;

// Initialize Sequelize using environment variables from .env file
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDatabaseConnection();

// add middleware to parse the json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add a basic route
app.get('/ping', function(req, res){
    res.json({'status': 'success', 'message': 'pong'});
});

// start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});