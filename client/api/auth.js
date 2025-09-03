import axios from "axios";

const URL = import.meta.env.MODE === "development"?`${import.meta.env.VITE_SERVER_URL}/api/auth`:'/api/auth';


export const checkAuth= async () => {
      const res = await axios.get(URL+"/check",{headers: { "auth-x": `Bearer ${localStorage.getItem("token")}` } });
      return res;
  
  }


export const signup = async (body) => {

    const { data } = await axios.post(URL + "/signup", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    return data;
};

export const login = async (body) => {
    const { data } = await axios.post(`${URL}/login`, body);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
};
