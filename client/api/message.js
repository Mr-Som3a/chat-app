import axios from "axios";
// import {socket} from "../api/socket.js"
const URL = `${import.meta.env.VITE_SERVER_URL}/api/message/`;


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
export const sendMessage = async (body) => {
  try {
    const { data } = await axios.post(`${URL}${body.recieverId}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-x": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
