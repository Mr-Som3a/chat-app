import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import useUserStore from "../store/user";

const Layout = () => {
  const {checkAuth}=useUserStore()

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    checkAuth().then(()=>setLoading(false))

  },[])

  if(loading){
    return (
      <div>Looding...</div>
    )
  }
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
