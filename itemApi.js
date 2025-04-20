import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

export const addItem = async (itemData, token) => {
    try {
        const res = await axios.post(`${API_URL}/add`, itemData, {
            headers: { Authorization: token },
        });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getItems = async () => {
    try {
        const res = await axios.get(`${API_URL}/`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};
