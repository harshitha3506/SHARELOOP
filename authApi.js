import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ✅ Login user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data; // Expecting { token, userId }
    } catch (error) {
        console.error("❌ Login API Error:", error.response?.data || error.message);
        throw error; // Pass error to component
    }
};

// ✅ Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("❌ Register API Error:", error.response?.data || error.message);
        throw error;
    }
};
