import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useUserStore from "../store/user";
import LoadingSpinner from "./loadingSpinner";

const Layout = () => {
  const { checkAuth, disConnectSocket} = useUserStore();
  const [isLoading, setIsLoading ] =useState(false)
  useEffect(() => {
    try{
      setIsLoading(true)
      checkAuth();
    }finally{
      setIsLoading(false)
    }
    return () => {
      disConnectSocket();
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <div className="bg-[url('/bgk.jpg')] bg-no-repeat bg-cover bg-center h-screen flex justify-center items-center ">
      <Outlet />
    </div>
  );
};

export default Layout;
