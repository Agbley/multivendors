import axios from "axios";
// export const axiosInstance = axios.create({
//   // baseURL: "https://multivendors.onrender.com",
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

// Function to get the token dynamically
const getToken = () => {
  return localStorage.getItem("token") || ""; // Return empty string if token is not found
};

export const axiosInstance = axios.create({
  // baseURL: "https://multivendors.onrender.com", // Set your base URL here
  headers: {
    authorization: `Bearer ${getToken()}`, // Dynamically get token
  },
});
