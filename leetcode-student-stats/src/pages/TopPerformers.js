import React, { useEffect, useState } from "react";
import { fetchTopPerformers } from "../api/apiService";
import "./TopPerformers.css";
import confetti from "canvas-confetti";

const TopPerformers = () => {
  const [students, setStudents] = useState([]);
  const [sortBy, setSortBy] = useState("thisWeek");
  const [year, setYear] = useState("");
  const [division, setDivision] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTopPerformers({ sortBy, year, division });
      setStudents(data);
    };
    loadData();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }, [sortBy, year, division]);

  const podium = students.slice(0, 3);
  const rest = students.slice(3);

  const getScore = (student) => {
    return sortBy === "thisWeek" ? student.thisWeek : student.totalSolved;
  };

  return (
    <div className="container">
      <h2 className="heading">🏆 Top Performers</h2>

      {/* Filters */}
      <div className="filters">
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="totalSolved">Total Solved</option>
            <option value="thisWeek">This Week</option>
          </select>
        </label>
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
      </div>

      {/* Podium */}
      <div className="podium">
        {podium[1] && (
          <div className="podium-box silver">
            <div className="medal-floating">🥈</div>
            <div className="podium-content">
              <strong>{podium[1].name}</strong>
              <div>{getScore(podium[1])} {sortBy === "thisWeek" ? "this week" : "total"}</div>
              <div>{podium[1].class} - Div {podium[1].div}</div>
              <div>Roll No: {podium[1].rollNo}</div>
            </div>
          </div>
        )}
        {podium[0] && (
          <div className="podium-box gold">
            <div className="medal-floating">🥇</div>
            <div className="podium-content">
              <strong>{podium[0].name}</strong>
              <div>{getScore(podium[0])} {sortBy === "thisWeek" ? "this week" : "total"}</div>
              <div>{podium[0].class} - Div {podium[0].div}</div>
              <div>Roll No: {podium[0].rollNo}</div>
            </div>
          </div>
        )}
        {podium[2] && (
          <div className="podium-box bronze">
            <div className="medal-floating">🥉</div>
            <div className="podium-content">
              <strong>{podium[2].name}</strong>
              <div>{getScore(podium[2])} {sortBy === "thisWeek" ? "this week" : "total"}</div>
              <div>{podium[2].class} - Div {podium[2].div}</div>
              <div>Roll No: {podium[2].rollNo}</div>
            </div>
          </div>
        )}
      </div>

      {/* Remaining Students */}
      <table className="performers-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Username</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Div</th>
            <th>Total</th>
            <th>This Week</th>
          </tr>
        </thead>
        <tbody>
          {rest.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 4}</td>
              <td>{s.name}</td>
              <td>{s.leetcodeId}</td>
              <td>{s.rollNo}</td>
              <td>{s.class}</td>
              <td>{s.div}</td>
              <td>{s.totalSolved}</td>
              <td>{s.thisWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformers;
