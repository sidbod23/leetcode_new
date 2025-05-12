const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const User = require('./models/db'); // Adjust the path as necessary

async function exportDataToExcel() {
    try {
        // Fetch all users from the database
        console.log('Fetching users from the database...');
        const users = await User.find();
        
        // If no users are found, log the message and return
        if (users.length === 0) {
            console.log('No users found to export.');
            return; // Early exit if no users are found
        }

        // Create a new workbook and add a worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        // Define the header row
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Class', key: 'class', width: 10 },
            { header: 'Roll No', key: 'rollNo', width: 15 },
            { header: 'Division', key: 'div', width: 10 },
            { header: 'LeetCode ID', key: 'leetcodeId', width: 20 },
            { header: 'Weekly Easy Progress', key: 'weeklyEasyProgress', width: 20 },
            { header: 'Weekly Medium Progress', key: 'weeklyMediumProgress', width: 20 },
            { header: 'Weekly Hard Progress', key: 'weeklyHardProgress', width: 20 },
        ];

        // Add rows of data to the worksheet
        users.forEach(user => {
            worksheet.addRow({
                name: user.name,
                class: user.class,
                rollNo: user.rollNo,
                div: user.div,
                leetcodeId: user.leetcodeId,
                weeklyEasyProgress: user.weeklyProgress.easy,
                weeklyMediumProgress: user.weeklyProgress.medium,
                weeklyHardProgress: user.weeklyProgress.hard,
            });
        });

        // Write the workbook to a file
        console.log('Writing data to users_data.xlsx...');
        await workbook.xlsx.writeFile('users_data.xlsx');
        console.log('Data has been written to users_data.xlsx');
    } catch (error) {
        console.error('Error exporting data to Excel:', error);
        // Optionally send the error details in the response for debugging
        throw error; // Re-throw the error to be caught at the endpoint
    }
}

module.exports=exportDataToExcel;