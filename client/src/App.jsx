import {Box, Paper} from "@mui/material"
import ChatWindow from "./components/chatWindow.jsx"
function App() {

  return (
    <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", height:"100vh"}}>

    <Paper elevation={3} sx={{display: "flex", justifyContent:'center', height: "80%", width: "70%",overflow:"hidden"}}>
      
      <ChatWindow />
    </Paper>
    </Box>
  )
}

export default App
