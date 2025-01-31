const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database');
    } catch (error) {
        throw new Error('An error occurred connecting to the database');
    }
};

module.exports = {dbConnection};