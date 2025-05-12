require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose'); // Import mongoose

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Parse MongoDB connection string
            useUnifiedTopology: true, // Ensure connection uses the latest engine
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // Export the connection function
