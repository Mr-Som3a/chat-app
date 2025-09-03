import axios from "axios";

const URL = `${import.meta.env.VITE_SERVER_URL}/api/users`

export const getUsers = async () => {
  
    const { data } = await axios.get(URL,{
      headers:{"auth-x": `Bearer ${localStorage.getItem('token')}`}
    });
    return data;
};

export const updateUser = async(body)=>{
  console.log(body,'api')
  const data = await axios.put(URL+"/profile/"+body.id,body,{
      headers:{"auth-x": `Bearer ${localStorage.getItem('token')}`}
  })
  return data
}


