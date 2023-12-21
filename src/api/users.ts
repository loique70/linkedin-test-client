// api/users.ts
import axios from "axios";

const API_URL = "https://linkedin-test-api.vercel.app/";

export const fetchSectors = async () => {
  try {
    const response = await axios.get(`${API_URL}sectors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sectors", error);
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const updateUser = async (userId: any, userData: any) => {
  try {
    const response = await axios.put(`${API_URL}users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating data", error);
  }
};
