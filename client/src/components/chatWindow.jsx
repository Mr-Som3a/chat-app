import { Box, Typography, Divider } from "@mui/material";

import Sidebar from "./sidebar";
import { useEffect } from "react";
import useMessageStore from "../store/message";
import useUserStore from "../store/user";
import { Outlet } from "react-router-dom";

const ChatWindow = () => {
  const { chatWith } = useUserStore();
  const { getMessages, initSocketListener } = useMessageStore();
  if (chatWith!==null) {
    useEffect(() => {
      getMessages(chatWith._id);
      // initSocketListener();
    }, [chatWith]);
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default ChatWindow;
