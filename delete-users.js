const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const User = require('./backend/models/User');

async function deleteUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete all users
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users`);

        // Close the connection
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error:', error);
    }
}

deleteUsers(); 