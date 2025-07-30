import { create } from "zustand";
import { getOldMsg, sendMessage } from "../../api/message.js";
import useUserStore from "./user.js";
import { useNavigate } from "react-router-dom";


const useMessageStore = create((set,get) => ({

  messages: [],
  loading:false,
  error:[],

  getMessages: async (id) => {
    try {
      
      const data = await getOldMsg(id);

      set({ messages: data ,loading:false});
    } catch (error) {
      set({error,loading:false})
    }
  },
  sendMessage: async(message) => {
    try {
      const data = await sendMessage(message)
      set({messages:[...get().messages,data]})
    } catch (error) {
      console.log(error)
    }
    
  },

  subscribeToMessage:()=>{
    const {socket,chatWith} = useUserStore.getState()
    
    if(!chatWith) return console.log('no user ');
  
    socket?.on("newMessage",(newMessage)=>{
      if(newMessage.senderId !== chatWith._id){
        return;
      } 
      set({messages:[...get().messages,newMessage]})
      
    })
  
  },
  unSubscribeToMessage :()=>{
    const socket = useUserStore.getState().socket
    socket?.off("newMessage")
  }

}));


export default useMessageStore