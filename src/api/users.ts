// api/users.ts
import axios from "axios";

export const fetchSectors = async () => {
  try {
    const response = await axios.get("http://localhost:8080/sectors");
    return response.data;
  } catch (error) {
    console.error("Error fetching sectors", error);
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const updateUser = async (userId: any, userData: any) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data", error);
  }
};
