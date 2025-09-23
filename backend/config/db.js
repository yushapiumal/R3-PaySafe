// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const isLive = process.env.LIVE === 'true';
const uri = isLive ? process.env.MONGO_URI_LIVE : process.env.MONGO_URI_DEV;
const client = new MongoClient(uri);
let paymentCollection;

async function connectToMongo() {
    try {
        await client.connect();
        console.log(`Connected to MongoDB (${isLive ? 'LIVE' : 'DEV'})`);
        paymentCollection = client.db('malkey_paysafe').collection('payments');
        const collections = await client.db('malkey_paysafe').listCollections().toArray();
        console.log('Collections in malkey_paysafe database:', collections.map(c => c.name));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = {
    connectToMongo,
    getPaymentCollection: () => paymentCollection
};

