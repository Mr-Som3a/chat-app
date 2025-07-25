import axios from "axios";

const URL = `${import.meta.env.VITE_SERVER_URL}/auth`;

export const signup = async (body) => {
  try {
    const { data } = await axios.post(URL + "/signup", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (body) => {

  try {
    const { data } = await axios.post(`${URL}/login`, {...body});
    console.log(data)
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    console.log(error);
  }
};
