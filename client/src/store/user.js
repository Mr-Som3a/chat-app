import { create } from "zustand";
import { getUsers, updateUser } from "../../api/users.js";
import { checkAuth, login, signup } from "../../api/auth.js";
import { io } from "socket.io-client";


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

  isLoading: false,
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
    set({isLoading:true})
    try {
      const data = await login(user);
      set({ currentUser: data });
      get().connectSocket();
    } catch (error) {
      set({ error:error});
    }finally{
      set({isLoading:false})
    }
  },

  signUp: async (body) => {
    set({ error: null })
    set({isLoading:true})
    try {
      const data = await signup(body);
      set({ currentUser: data });
      get().connectSocket();
    } catch (error) {
      set({error});
    }finally{
      set({isLoading:false})
    } 
  },
  updateProfilePic: async (data) => {
    set({error:null})
    try {
      set({ isUpdatingProfile: true });
      const res = await updateUser(data);
      set({ currentUser: res });
    } catch (error) {
      set({error})
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
