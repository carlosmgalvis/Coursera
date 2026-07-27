const mongoose = require('mongoose');
const mongoURI = "mongodb://root:CrTWYLo9eXcXpKumj4wUUoj4@172.21.169.162:27017";

const connectToMongo = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    try {
        await mongoose.connect(mongoURI, {
            dbName: 'health',
            authSource: 'admin',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.info('✅ Connected to MongoDB Successfully');
    } catch (error) {
        console.error(`❌ Connection attempt ${retryCount + 1} failed:`, error.message);

        if (retryCount + 1 >= MAX_RETRIES) {
            throw new Error('Unable to connect to MongoDB after several retries.');
        }

        console.info(`🔄 Retrying in 2 seconds... (${retryCount + 1})`);
        await new Promise(res => setTimeout(res, 2000));

        return connectToMongo(retryCount + 1);
    }
};

module.exports = connectToMongo;
