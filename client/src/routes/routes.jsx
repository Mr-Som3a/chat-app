import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout.jsx";
import WelcomeChat from "../components/welcomeChat.jsx";
import ChatWith from "../components/chatWith.jsx";
import { protectedChatLoader, protectedLoader } from "./auth.js";
import Logout from "../components/auth/logout.jsx";
import AuthPage from "../pages/authPage.jsx";
import ChatWindow from "../pages/chatWindow.jsx";
import ProfilePage from "../pages/profilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: protectedLoader,
    children: [
      {
        element: <ChatWindow />,
        children: [
          {
            index: true,
            element: <WelcomeChat />,
          },
          {
            path: "/message/:recieverId",
            loader: protectedChatLoader,
            element: <ChatWith />,
          },
          {
            path: "/profile/:id",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

export default router;
