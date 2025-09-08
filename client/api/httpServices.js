import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development"? `${import.meta.env.VITE_SERVER_URL}/api`:"/api",
    withCredentials:true,
    headers: { "auth-x": `Bearer ${localStorage.getItem("token")}` }
})