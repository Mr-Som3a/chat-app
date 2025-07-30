import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({msg,setMsg,handleSend}) => {
  


  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" }
      />
      <IconButton color="primary" onClick={()=>handleSend()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
