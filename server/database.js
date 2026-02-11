const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hms';

        // Detailed logging for debugging (without leaking password)
        console.log('--- MongoDB Debug Info ---');
        console.log('URI Length:', uri ? uri.length : 0);
        console.log('Starts with "mongodb+srv":', uri ? uri.startsWith('mongodb+srv') : false);

        const maskedUri = uri.replace(/\/\/.*@/, '//****:****@');
        console.log('Masked URI:', maskedUri);

        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
