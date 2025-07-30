import axios from "axios";

const URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;


export const checkAuth= async () => {
    try {
      const res = await axios.get(URL+"/check",{headers: { "auth-x": `Bearer ${localStorage.getItem("token")}` } });
      return res;
    } catch (error) {
      console.log("Error in checkAuth:", error);
    }
  }


export const signup = async (body) => {
  try {
    const { data } = await axios.post(URL + "/signup", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (body) => {
  try {
    const { data } = await axios.post(`${URL}/login`, body);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);
    return data.user;
  } catch (error) {
    console.log(error);
  }
};
