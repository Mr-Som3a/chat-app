import { Box, Typography } from "@mui/material";

const MessageList = ({messages}) => {
  console.log(messages)
  const messagesL = [
    { text: "Hey there!", sender: "friend" },
    { text: "Hi! How are you?", sender: "me" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {messagesL.map((msg, index) => (
        <Box
          key={index}
          sx={{
            alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
            bgcolor: msg.sender === "me" ? "#1976d2" : "#eeeeee",
            color: msg.sender === "me" ? "white" : "black",
            px: 2,
            py: 1,
            borderRadius: 2,
            maxWidth: "60%",
          }}
        >
          <Typography variant="body2">{msg.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
