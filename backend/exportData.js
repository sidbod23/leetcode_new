const ExcelJS = require('exceljs');
const User = require('./models/db');

async function exportDataToExcel() {
  try {
    console.log('Fetching users from the database...');
    const users = await User.find();

    if (users.length === 0) {
      console.log('No users found to export.');
      return null;
    }

    const groupedUsers = {};
    users.forEach(user => {
      const sheetName = `${user.class}${user.div}`;
      if (!groupedUsers[sheetName]) {
        groupedUsers[sheetName] = [];
      }
      groupedUsers[sheetName].push(user);
    });

    const orderedSheetNames = Object.keys(groupedUsers).sort((a, b) => {
      const getOrder = (sheet) => {
        const [cls, div] = [sheet.slice(0, 2), parseInt(sheet.slice(2))];
        const classWeight = cls === "SE" ? 0 : cls === "TE" ? 1 : 2;
        return classWeight * 100 + div;
      };
      return getOrder(a) - getOrder(b);
    });

    const workbook = new ExcelJS.Workbook();

    orderedSheetNames.forEach(sheetName => {
      const worksheet = workbook.addWorksheet(sheetName);

      worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Roll No', key: 'rollNo', width: 15 },
        { header: 'LeetCode ID', key: 'leetcodeId', width: 25 },
        { header: 'Easy Solved', key: 'easySolved', width: 15 },
        { header: 'Medium Solved', key: 'mediumSolved', width: 15 },
        { header: 'Hard Solved', key: 'hardSolved', width: 15 },
        { header: 'Total Solved', key: 'totalSolved', width: 15 },
        { header: 'This Week', key: 'thisWeek', width: 15 },
        { header: 'Last Week', key: 'lastWeek', width: 15 },
        { header: '2 Weeks Ago', key: 'lastToLastWeek', width: 18 },
      ];

      groupedUsers[sheetName]
        .sort((a, b) => a.rollNo - b.rollNo)
        .forEach(user => {
          worksheet.addRow({
            name: user.name,
            rollNo: user.rollNo,
            leetcodeId: user.leetcodeId,
            easySolved: user.easySolved,
            mediumSolved: user.mediumSolved,
            hardSolved: user.hardSolved,
            totalSolved: user.totalSolved,
            thisWeek: user.thisWeek,
            lastWeek: user.lastWeek,
            lastToLastWeek: user.lastToLastWeek,
          });
        });
    });

    return workbook;
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
    throw error;
  }
}

module.exports = exportDataToExcel;
