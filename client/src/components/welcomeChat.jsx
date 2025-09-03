import { Box, Typography } from "@mui/material";
import useUserStore from "../store/user";
import { MessageCircle } from "lucide-react";

const WelcomeChat = () => {
  const {currentUser}=useUserStore()
  return (
    <>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full flex flex-col items-center space-y-2 max-w-md h-fit text-center">
        <MessageCircle className="w-8 h-8  text-green-600 animate-bounce " />
        <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser?.fullName} 👋</h1>
        <p className="text-gray-600 mb-6">
          Select a friend to start chatting
        </p>
      </div>
    </>
  );
};

export default WelcomeChat;
