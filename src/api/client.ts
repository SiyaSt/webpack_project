import axios from "axios";

export const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      message: error.response?.data?.message || "Unknown error occurred",
      status: error.response?.status,
    });
  },
);
