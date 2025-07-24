import axios from "axios";

const URL = `${import.meta.env.SERVER_URL}`;

export const getUsers = async () => {
  try {
    const { data } = await axios.get(URL + "/users");
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};


