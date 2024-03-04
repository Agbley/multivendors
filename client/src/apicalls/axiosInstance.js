import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL: "https://multivendors.onrender.com",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
