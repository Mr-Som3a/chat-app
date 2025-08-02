import { Box, Divider, Typography } from "@mui/material";
import MessageList from "./messageList.jsx";
import MessageInput from "./messageInput.jsx";
import { useEffect, useState } from "react";
import useUserStore from "../store/user";
import useMessageStore from "../store/message";
import { useNavigate, useParams } from "react-router-dom";

const ChatWith = () => {
  const [input, setInput] = useState("");
  const { recieverId } = useParams();
  const { chatWith } = useUserStore();
  const {
    messages,
    getMessages,
    sendMessage,
    unSubscribeToMessage,
    subscribeToMessage,
  } = useMessageStore();

    useEffect(() => {
      getMessages(recieverId);
      subscribeToMessage();

      return () => unSubscribeToMessage();
    }, [recieverId, subscribeToMessage, getMessages, unSubscribeToMessage]);

  const handleSend = () => {
    if (input.trim()) {
      const msg = {
        recieverId: recieverId,
        text: input,
        photoPath: "",
      };
      sendMessage(msg);
      setInput("");
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
        <Typography variant="h6">
          {chatWith ? chatWith.fullName : "Friend Name"}
        </Typography>
      </Box>

      <Divider />

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <MessageList messages={messages} id={recieverId} />
      </Box>

      <Divider />

      {/* Input */}
      <Box sx={{ p: 2 }}>
        <MessageInput msg={input} setMsg={setInput} handleSend={handleSend} />
      </Box>
    </Box>
  );
};

export default ChatWith;
