import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const ChatWindow = () => {

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default ChatWindow;
