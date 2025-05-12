import React, { useEffect, useState } from "react";
import StudentTable from "../components/StudentTable";
import { fetchAllStudents } from "../api/apiService";

export default function StudentTablePage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchAllStudents();
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  useEffect(() => {
    let filtered = students;

    if (yearFilter) {
      filtered = filtered.filter((student) => student.class === yearFilter);
    }

    if (divisionFilter) {
      filtered = filtered.filter(
        (student) => student.div === parseInt(divisionFilter, 10)
      );
    }

    if (sortOption === "rollNo") {
      filtered = [...filtered].sort((a, b) => a.rollNo - b.rollNo);
    } else if (sortOption === "totalSolved") {
      filtered = [...filtered].sort((a, b) => b.totalSolved - a.totalSolved);
    }

    setFilteredStudents(filtered);
  }, [yearFilter, divisionFilter, sortOption, students]);

  const handleReload = async () => {
    try {
      setUpdateMessage("Updating data... Might take few minutes please wait!");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update`);
      const data = await response.json();

      if (response.ok) {
        setUpdateMessage("Data updated successfully!");
        setLastUpdated(new Date().toLocaleString());
        const updatedStudents = await fetchAllStudents();
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
      } else {
        setUpdateMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      setUpdateMessage("Error updating data.");
    }

    setTimeout(() => {
      setUpdateMessage("");
    }, 5000);
  };

  if (loading) return <div>Loading data... Please wait.</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>PICT LeetCode Stats</h1>
        <div className="header-buttons">
          <button className="reload-button" onClick={handleReload}>
            🔄
          </button>
        </div>
      </div>

      {updateMessage && <div className="update-message">{updateMessage}</div>}
      {lastUpdated && <div className="last-updated">Last Updated: {lastUpdated}</div>}

      <div className="filters">
        <label>
          Year:
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="">All</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
          </select>
        </label>
        <label>
          Division:
          <select value={divisionFilter} onChange={(e) => setDivisionFilter(e.target.value)}>
            <option value="">All</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="totalSolved">Solved Questions</option>
            <option value="rollNo">Roll No</option>
          </select>
        </label>
      </div>

      <StudentTable students={filteredStudents} />
    </div>
  );
}
