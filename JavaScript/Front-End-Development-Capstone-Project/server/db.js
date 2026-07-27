const mongoose = require('mongoose');
const mongoURI = "mongodb://root:Ihe0DybRXi4AWwyhj2wbF2wc@172.21.142.187:27017";

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI, { dbName: 'stayhealthybeta1'});
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            console.error('Unable to connect to Mongo. Falling back to local file storage for auth.');
            return false;
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};

const isMongoConnected = () => mongoose.connection.readyState === 1;

module.exports = {
    connectToMongo,
    isMongoConnected,
};
