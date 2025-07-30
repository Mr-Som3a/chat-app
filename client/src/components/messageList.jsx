import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const MessageList = ({ messages, id }) => {
  const lasTMessage = useRef(null);
  useEffect(() => {
    if (lasTMessage.current && messages) {
      lasTMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {messages.length === 0 ? (
        <Typography
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          Start Chating, Say Hello
        </Typography>
      ) : (
        messages.map((msg, index) => (
          <Box
            ref={lasTMessage}
            key={index}
            sx={{
              alignSelf: msg.senderId === id ? "flex-end" : "flex-start",
              bgcolor: msg.senderId === id ? "#1976d2" : "#eeeeee",
              color: msg.senderId === id ? "white" : "black",
              px: 2,
              py: 1,
              borderRadius: 2,
              maxWidth: "60%",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default MessageList;
