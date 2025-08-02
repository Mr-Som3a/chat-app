import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout.jsx";
import WelcomeChat from "../components/welcomeChat.jsx";
import ChatWith from "../components/chatWith.jsx";
import { protectedChatLoader, protectedLoader } from "./auth.js";
import AuthForm from "../components/auth/authForm.jsx";
import Logout from "../components/auth/logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: protectedLoader,
    children: [
      {
        index:true,
        element: <WelcomeChat />,
      },
      {
        path: "/message/:recieverId",
        element: <ChatWith />,
        loader: protectedChatLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthForm />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

export default router;
