import { Box, Typography, Divider } from "@mui/material";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import useMessageStore from "../store/message";
import AuthForm from "./auth/authForm";

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const {
    messages,
    // loading,
    // error,
    getMessages,
    sendMessage,
    initSocketListener,
  } = useMessageStore();

  useEffect(() => {
    getMessages();
    initSocketListener();
  }, []);

  const handleSend = (msgg) => {
    if (input.trim()) {
      const msg = {
        senderId: id,
        recieverId: _id,
        text: input,
        photoPath: "",
        timestamp: Date.now(),
      };
      sendMessage(msgg);
      setInput("");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
              <Typography variant="h6">Friend Name</Typography>
            </Box>

            <Divider />

            {/* Messages */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              <MessageList messages={messages} />
            </Box>

            <Divider />

            {/* Input */}
            <Box sx={{ p: 2 }}>
              <MessageInput
                msg={input}
                setMsg={setInput}
                handleSend={handleSend}
              />
            </Box>
          </Box>
        </>
      ) : (
        <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
};

export default ChatWindow;
