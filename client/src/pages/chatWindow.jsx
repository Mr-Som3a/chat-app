import useUserStore from "../store/user";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const ChatWindow = () => {
  return (
    <>
        <div className=" h-screen lg:max-h-[35rem]  rounded-2xl w-full lg:w-4/5 xl:w-3/5 flex flex-col bg-gray-800">
          {/* Navbar */}
          <Navbar />
          {/* Chat Window */}
          <div className="flex-1 flex h-[15rem] ">
            {/* Sidebar Contacts */}
            <div className="hidden md:block min-h-full w-2/5 overflow-y-scroll">
                 <Sidebar />
            </div>
            <div className="flex justify-center items-center w-full ">
                <Outlet /> 
            </div>
          </div>
        </div>
    </>
  );
};

export default ChatWindow;
