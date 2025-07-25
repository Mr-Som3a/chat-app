import { create } from "zustand";
import { getOldMsg } from "../../api/message.js";
import { socket } from "../../api/message.js";
const useMessageStore = create((set) => ({

  messages: [],
  loading:false,
  error:[],

  getMessages: async (id) => {
    try {
      const data = await getOldMsg(id);
      console.log(data, "inside zustand");
      set({ messages: data ,loading:false});
    } catch (error) {
      set({error,loading:false})
    }
  },
  sendMessage: (message) => {
    socket.emit('chat:message', message);
  },
  receiveMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  initSocketListener: () => {
    socket.on('chat:message', (message) => {
      useChatStore.getState().receiveMessage(message);
    });
  },
}));


export default useMessageStore