import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  fetchAllStudents,
  fetchStudentsByYear,
  fetchStudentsByYearAndDivision,
  fetchUserProgress,
} from "../api/apiService";
import "./StudentsPage.css";

Modal.setAppElement("#root");

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState("");
  const [division, setDivision] = useState("");
  const [sortBy, setSortBy] = useState("totalSolved");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (year && division) {
          data = await fetchStudentsByYearAndDivision(year, division);
        } else if (year) {
          data = await fetchStudentsByYear(year);
        } else {
          data = await fetchAllStudents();
        }
        if (sortBy === "rollNo") {
          data.sort((a, b) => a.rollNo - b.rollNo);
        } else {
          data.sort((a, b) => b[sortBy] - a[sortBy]);
        }
        setStudents(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    };
    fetchData();
  }, [year, division, sortBy]);

  const handleShowProgress = async (userId) => {
    try {
      const data = await fetchUserProgress(userId);
      setSelectedUser(data);
      setIsModalOpen(true);
    } catch (err) {
      alert("Failed to fetch user progress");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const formatWeeklyProgress = (user) => {
    return [
      { week: "2 Weeks Ago", solved: user.lastToLastWeek },
      { week: "Last Week", solved: user.lastWeek },
      { week: "This Week", solved: user.thisWeek },
    ];
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="students-container">
    <h2 className="student-heading">📋 Student List</h2>

      <div className="filters">
        <label>
          Class:
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
          </select>
        </label>
        <label>
          Division:
          <select value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="">All</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="totalSolved">Total Solved</option>
            <option value="thisWeek">This Week</option>
            <option value="rollNo">Roll No</option>
          </select>
        </label>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Division</th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
            <th>Total</th>
            <th>This Week</th>
            <th>Last Week</th>
            <th>2 Weeks Ago</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((user) => (
            <tr key={user._id}>
              <td>
                <span className="clickable" onClick={() => handleShowProgress(user._id)}>
                  {user.name}
                </span>
              </td>
              <td>{user.rollNo}</td>
              <td>{user.class}</td>
              <td>{user.div}</td>
              <td style={{ backgroundColor: '#d4edda' }}>{user.easySolved}</td>
              <td style={{ backgroundColor: '#fff3cd' }}>{user.mediumSolved}</td>
              <td style={{ backgroundColor: '#f8d7da' }}>{user.hardSolved}</td>
              <td>{user.totalSolved}</td>
              <td>{user.thisWeek}</td>
              <td>{user.lastWeek}</td>
              <td>{user.lastToLastWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Progress"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedUser && (
          <div>
            <h2>{selectedUser.name}'s Progress</h2>
            <p><strong>Roll No:</strong> {selectedUser.rollNo}</p>
            <p><strong>Class:</strong> {selectedUser.class}</p>
            <p><strong>Division:</strong> {selectedUser.div}</p>
            <p><strong>Total Solved:</strong> {selectedUser.totalSolved}</p>
            <p><strong>This Week:</strong> {selectedUser.thisWeek}</p>
            <p><strong>Last Week:</strong> {selectedUser.lastWeek}</p>
            <p><strong>2 Weeks Ago:</strong> {selectedUser.lastToLastWeek}</p>

            <h4>📈 Weekly Progress</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={formatWeeklyProgress(selectedUser)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="solved" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <button onClick={closeModal} className="btn-close">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentsPage;
