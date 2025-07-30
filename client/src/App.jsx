import { Box, Paper } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";


function App() {


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "80%",
          width: "70%",
          overflow: "hidden",
        }}
      >
        <RouterProvider router={router} />
      </Paper>
    </Box>
  );
}

export default App;
