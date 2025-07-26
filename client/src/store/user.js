import { create } from "zustand";
import { getUsers } from "../../api/users.js";

const useUserStore = create((set) => ({
  chatWith:null,
  users: [],
  loading: false,
  error: [],

  setChatWith: (user)=>{
    localStorage.setItem('user',user)
    set({chatWith:user})
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

export default useUserStore