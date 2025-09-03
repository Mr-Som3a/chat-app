import { Box, Paper } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useState } from "react";
import { MessageCircle, Lock, Mail, User } from "lucide-react";
import AuthPage from "./pages/authPage.jsx";
import { Toaster } from "react-hot-toast";


function App() {


  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
    
  );
}

export default App;




