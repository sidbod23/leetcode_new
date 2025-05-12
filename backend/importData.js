const xlsx = require('xlsx');
const User = require('./models/db');

// Function to process and validate the data
const processData = (data) => {
    return data.map((row) => ({
        name: row['Full name'],
        rollNo: parseInt(row['Roll number'], 10), // Convert to integer 
        div: parseInt(row['Division'],10),
        class: row['Current year'],
        leetcodeId: row['Leetcode username'],
        totalSolved: parseInt(row.totalSolved || '0', 10),// Default to 0 if empty
        easySolved: parseInt(row.easySolved || '0', 10),
        mediumSolved: parseInt(row.mediumSolved || '0', 10),
        hardSolved: parseInt(row.hardSolved || '0', 10),
         
        weeklyProgress: {
            easy: parseInt(row.weeklyEasy || '0', 10), // Default to 0 if empty
            medium: parseInt(row.weeklyMedium || '0', 10), // Default to 0 if empty
            hard: parseInt(row.weeklyHard || '0', 10), // Default to 0 if empty
        },
    }));
};

// Function to read and import data from the Excel file
const importExcelData = async (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath); // Load the Excel file
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        console.log('Raw Data from Excel:', jsonData);

        // Process the data
        const processedData = processData(jsonData);
        console.log('Processed Data:', processedData);

        // Insert each row into the database
        for (const userData of processedData) {
            const existingUser = await User.findOne({ rollNo: userData.rollNo, div: userData.div, class: userData.class });
            if (existingUser) {
                console.log(`User with Roll No: ${userData.rollNo} already exists. Skipping.`);
            } else {
                const user = new User(userData);
                await user.save();
                console.log(`User ${userData.name} added successfully.`);
            }
        }

        console.log('All data imported successfully.');
    } catch (err) {
        console.error('Error importing data:', err.message);
    }
};

module.exports = importExcelData;
