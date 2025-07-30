import axios from "axios";

const URL = `${import.meta.env.VITE_SERVER_URL}/api/users`;

export const getUsers = async () => {
  try {
    const { data } = await axios.get(URL,{
      headers:{"auth-x": `Bearer ${localStorage.getItem('token')}`}
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};


