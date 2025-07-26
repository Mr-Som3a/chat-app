import axios from "axios";
import { io } from "socket.io-client";

const URL = `${import.meta.env.VITE_SERVER_URL}/message/`;

// socket.js
export const socket = io(URL);

export const getOldMsg = async (recieverId) => {
  try {
    const { data } = await axios.get(`${URL}${recieverId}`, {
      headers: { "auth-x": `Bearer ${localStorage.getItem("token")}`},
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const sendMsg = async (body) => {
  const socket = io(URL);
  try {
    const { data } = await axios.post(URL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-x": localStorage.getItem(token),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
