import { create } from "zustand";
import { getUsers } from "../../api/users";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: [],

  getUsers: async () => {
    try {
      const data = await getUsers();
      set({ users: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useUserStore