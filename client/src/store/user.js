import { create } from "zustand";
import { getUsers, updateUser } from "../../api/users.js";
import { checkAuth, login, signup } from "../../api/auth.js";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const useUserStore = create((set, get) => ({
  
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  chatWith: null,
  currentUser: null,
  socket: null,

  users: [],
  onlineUsers: [],

  // isLoading: false,
  error: null,

  checkAuth: async () => {
    set({ error: null });
    try {
      const res = await checkAuth();
      set({ currentUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ error });
      set({ currentUser: null });
    }
  },

  login: async (user) => {
    set({ error: null });
    try {
      const data = await login(user);
      set({ currentUser: data });
      get().connectSocket();
    } catch (error) {
      console.log(error,'store')
      set({ error:error});
    } 
  },

  signUp: async (body) => {
    try {
      const data = await signup(body);
      set({ currentUser: data });
      get().connectSocket();
    } catch (error) {
      set({ error });
    } 
  },
  updateProfilePic: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      console.log(data,'inside')
      const res = await updateUser(data);
      set({ currentUser: res });
      // toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      // toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    try {
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
    } catch (error) {
      set({ error });
    }
  },

  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  setChatWith: (user) => {
    set({ chatWith: user });
  },

  fetchUsers: async () => {
    set({error:null})
    try {
      const data = await getUsers();
      set({ users: data });
    } catch (error) {
      set({ error: error.message });
    } 
  },

  updateProfile: async()=>{
    set({error:null})
    try {
      const data = await updateUser()
      set({currentUser:data})
    } catch (error) {
      set({error: error.message})
    }
  }
}));

export default useUserStore;
