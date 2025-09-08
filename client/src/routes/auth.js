import { redirect} from 'react-router-dom'
import useUserStore from '../store/user';


export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null
}


export function protectedLoader() {
  
  if (!isAuthenticated()) {
    
    return redirect("/login")
  }
  return null
}

export function protectedChatLoader(){
  const chatWith = useUserStore.getState().chatWith;
  if(!chatWith){
    return redirect("/")
  }
  return null

}


