import { io } from "socket.io-client";

// socket.js
export const socket = io(import.meta.env.MODE === "development"?`${import.meta.env.VITE_SERVER_URL}`:'/');
