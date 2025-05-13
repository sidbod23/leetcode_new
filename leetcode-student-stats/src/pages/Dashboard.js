import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

import {
  fetchClassTotals,
  fetchWeeklyStats,
  fetchClassDistribution,
  fetchTopThisWeek,
  fetchDifficultyBreakdown
} from "../api/apiService";

import "./Dashboard.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Dashboard = () => {
  const [classTotals, setClassTotals] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [classDistribution, setClassDistribution] = useState([]);
  const [difficultyData, setDifficultyData] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const totals = await fetchClassTotals();
        const weekly = await fetchWeeklyStats();
        const distribution = await fetchClassDistribution();
        const difficulty = await fetchDifficultyBreakdown();



        setClassTotals(totals);
        setWeeklyProgress(weekly);
        setClassDistribution(distribution);
        setDifficultyData(difficulty);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard Overview</h2>

      <div className="chart-box">
  <h3>Difficulty Breakdown by Class</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={difficultyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="class" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="easy" stackId="a" fill="#a0e7a0" barSize={200} />
    <Bar dataKey="medium" stackId="a" fill="#ffe29a" barSize={200} />
    <Bar dataKey="hard" stackId="a" fill="#ff9e9e" barSize={200} />
    </BarChart>
  </ResponsiveContainer>
</div>


      {/* Bar Chart */}
      <div className="chart-box">
        <h3>Total Solved by Class</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={classTotals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="class" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" barSize={200}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="chart-box">
        <h3>Weekly Solving Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-box">
        <h3>Class-Wise Student Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={classDistribution}
              dataKey="count"
              nameKey="class"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {classDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
     </div> 
  );
};

export default Dashboard;
