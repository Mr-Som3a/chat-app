import axios from "axios";
import { io } from 'socket.io-client';

const URL = `${import.meta.env.SERVER_URL}`;

// socket.js
export const socket = io(URL)


export const getOldMsg = async () => {
  try {
    const { data } = await axios.get(URL + "/message");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const sendMsg = async (body) => {
  // const socket = io(URL);
  try {
    const { data } = await axios.post(URL + "/message", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
