// src/api/apiService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";
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
