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
