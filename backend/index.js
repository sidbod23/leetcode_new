const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const connectDB = require('./dbconnect');
const importExcelData = require('./importData');
const exportDataToExcel = require('./exportData');
const updateLeetCodeStats = require('./updatedb');
const userRouter = require('./routes/userRoutes');
const cron = require('node-cron');
const authenticate = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins
app.use(cors({
  origin: ['https://pictleetcode.netlify.app',
    'http://localhost:3000'
  ], // ✅ replace with your Netlify domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // optional, but safe to include if needed
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/users', userRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

// Export Data route
app.get('/export', async (req, res) => {
  try {
    const workbook = await exportDataToExcel();

    if (!workbook) {
      return res.status(404).send('No users found.');
    }

    const fileName = `LeetCode_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error during export:', error);
    res.status(500).send('Error exporting data.');
  }
});


// Update LeetCode stats for all users
app.get('/update', async (req, res) => {
  try {
    // Call the update function to update LeetCode stats for all users
    await updateLeetCodeStats(); 
    res.json({ message: 'LeetCode stats updated for all users.' });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ error: 'Error updating LeetCode stats.' });
  }
});

// Schedule weekly update at midnight every Sunday
cron.schedule('0 0 * * *', async () => {
  console.log('Running weekly LeetCode stats update...');
  try {
    await updateLeetCodeStats();
    console.log('Weekly update completed successfully.');
  } catch (error) {
    console.error('Error during scheduled weekly update:', error);
  }
}
,{ timezone: 'Asia/Kolkata' });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Optional: Import data (commented out because it's already called manually)
const filePath='./data/user_data.xlsx'
//importExcelData(filePath);

