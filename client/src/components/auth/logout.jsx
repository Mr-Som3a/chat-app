import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate=useNavigate()
   setTimeout(()=>{
     localStorage.clear();
    navigate("/login");
   },2000)
  return <div>logout...</div>;
};

export default Logout;
