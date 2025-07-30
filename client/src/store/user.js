import { create } from "zustand";
import { getUsers } from "../../api/users.js";
import { checkAuth, login, signup } from "../../api/auth.js";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const useUserStore = create((set, get) => ({
  isSigningUp: false,
  isLoggingIn: false,
  // isUpdatingProfile: false,
  isCheckingAuth: true,
  chatWith: null,
  currentUser: null,
  socket: null,
  users: [],
  onlineUsers: [],
  isloading: false,
  error: [],

  checkAuth: async () => {
    try {
      const res = await checkAuth();
      set({ currentUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (user) => {
    const data = await login(user);
    console.log(data);
    set({ currentUser: data });
    get().connectSocket();
  },

  signup: async () => {
    const data = await signup();
    set({ currentUser: data });
  },

  connectSocket: () => {
    const { currentUser } = get();
    if (!currentUser || get().socket?.connected) return;
    const socket = io(import.meta.env.VITE_SERVER_URL, {
      query: {
        userId: currentUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds });
    });
  },
  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  setChatWith: (user) => {
    set({ chatWith: user });
  },

  fetchUsers: async () => {
    try {
      const data = await getUsers();
      set({ users: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useUserStore;
