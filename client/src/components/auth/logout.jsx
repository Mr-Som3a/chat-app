import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate=useNavigate()
   setTimeout(()=>{
     localStorage.clear();
    navigate("/login");
   },2000)
  return <div className="flex justify-center items-center">
    <div className=" h-screen bg-center loading  loading-spinner loading-xl"></div>
  </div>;
};

export default Logout;
