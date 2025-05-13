// src/api/apiService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Update with your backend URL if different

// Fetch all students
export const fetchAllStudents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/all`);
    return response.data.data; // Assuming the backend response contains a `data` object with student details
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

// Fetch students by year (e.g., SE or TE)
export const fetchStudentsByYear = async (year) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/class/${year}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching students for year ${year}:`, error);
    throw error;
  }
};

// Fetch students by year and division
export const fetchStudentsByYearAndDivision = async (year, division) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/class/${year}/${division}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching students for year ${year} and division ${division}:`, error);
    throw error;
  }
};

export const fetchTopPerformers = async ({ sortBy, year, division }) => {
  try {
    const token = localStorage.getItem("auth_token");
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (year) params.append("class", year);
    if (division) params.append("div", division);

    const response = await axios.get(`${BASE_URL}/users/top-performers?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching top performers:", error);
    throw error;
  }
};

export const fetchClassTotals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/class-totals`);
    return response.data; // [{ class: "SE", total: 1000 }, ...]
  } catch (error) {
    console.error("Error fetching class totals:", error);
    throw error;
  }
};

export const fetchWeeklyStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/weekly`);
    return response.data; // [{ week: "This Week", total: 150 }, ...]
  } catch (error) {
    console.error("Error fetching weekly stats:", error);
    throw error;
  }
};

export const fetchClassDistribution = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/class-distribution`);
    return response.data; // [{ class: "SE", count: 50 }, ...]
  } catch (error) {
    console.error("Error fetching class distribution:", error);
    throw error;
  }
};

export const fetchTopThisWeek = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/top-this-week`);
    return response.data; // [{ name, class, div, thisWeek, totalSolved }, ...]
  } catch (error) {
    console.error("Error fetching top this week:", error);
    throw error;
  }
};

// Fetch progress details for a single user by ID
export const fetchUserProgress = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/progress`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
};

export const fetchDifficultyBreakdown = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/difficulty-breakdown`);
    return response.data;
  } catch (error) {
    console.error("Error fetching difficulty breakdown:", error);
    throw error;
  }
};
