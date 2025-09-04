import useUserStore from "../store/user.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const { users, fetchUsers, setChatWith} = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, []);

  


  return (
    <>
      <div className=" hidden md:block bg-gray-200 p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Contacts</h3>
        <div className="space-y-2 min-h-screen  ">
          {users.length===0?<div>Empty</div>:(users.map(user=>(
            <Link key={user._id} to={`/message/${user._id}`} onClick={() => setChatWith(user)} className="flex items-center  space-y-2 p-2 rounded-lg focus:bg-green-100 transition-colors ease-in-out duration-300 cursor-pointer">
            {user.picturePath&&<img className="w-8 h-8 rounded-full" src={user.picturePath} alt="" />||<div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">{user.fullName.slice(0,1)}</div>}
            <p className="ml-3 font-medium text-gray-700">{user.fullName}</p>
            </Link>
          )))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

