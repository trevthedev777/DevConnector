// mongodb Connection
const mongoose = require('mongoose');

const config = require('config');

// to get all values in default.json
const db = config.get('mongoURI');

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });

        console.log('MongoDB Connected');
    } catch(err) {
        console.error(err.message);
        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;