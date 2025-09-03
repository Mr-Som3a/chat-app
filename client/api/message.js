import axios from "axios";
// import {socket} from "../api/socket.js"
const URL =`${import.meta.env.VITE_SERVER_URL}/api/message`;

export const getOldMsg = async (recieverId) => {
  try {
    const { data } = await axios.get(`${URL}${recieverId}`, {
      headers: { "auth-x": `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const sendMessage = async (body) => {
  console.log('last point',body)
  const { data } = await axios.post(`${URL}${body.recieverId}`, body, {
    headers: {
      "auth-x": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};


export const sendImage = async()=>{
  
  return await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_CLOUD_NAME}/image/upload`)
}
