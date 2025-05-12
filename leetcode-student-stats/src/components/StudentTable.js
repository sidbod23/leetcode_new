import React from "react";
import * as XLSX from "xlsx";

const StudentTable = ({ students }) => {
  const exportToExcel = () => {
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      students.map((student, index) => ({
        "Sr. No": index + 1,
        Name: student.name,
        "Current Year": student.class,
        Division: student.div,
        "Roll No.": student.rollNo,
        "LeetCode Username": student.leetcodeId,
        Easy: student.easySolved,
        Medium: student.mediumSolved,
        Hard: student.hardSolved,
        Total: student.totalSolved,
        "This Week": student.thisWeek,
        "Last Week": student.lastWeek,
        "Last to Last Week": student.lastToLastWeek,
      }))
    );

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, "StudentData.xlsx");
  };

  return (
    <div>
      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Current Year</th>
            <th>Division</th>
            <th>Roll No.</th>
            <th>LeetCode Username</th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
            <th>Total</th>
            <th>This Week</th>
            <th>Last Week</th>
            <th>Last to Last Week</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.rollNo}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.div}</td>
              <td>{student.rollNo}</td>
              <td>{student.leetcodeId}</td>
              <td>{student.easySolved}</td>
              <td>{student.mediumSolved}</td>
              <td>{student.hardSolved}</td>
              <td>{student.totalSolved}</td>
              <td>{student.thisWeek || 0}</td>
              <td>{student.lastWeek || 0}</td>
              <td>{student.lastToLastWeek || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
