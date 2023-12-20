import axios from "axios";

export const fetchSectors = async () => {
  try {
    const response = await axios.get("http://localhost:8080/sectors");
    return response.data;
  } catch (error) {
    console.error("Error fetching sectors", error);
  }
};
