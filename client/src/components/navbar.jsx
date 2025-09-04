import { CircleIcon, LogOut, Menu, MessageCircle, User } from "lucide-react";
import useUserStore from "../store/user";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser,fetchUsers,users,setChatWith, onlineUsers } = useUserStore();
useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="navbar rounded-t-2xl bg-green-700 text-white px-4">
        {/* Drawer */}
        <div className="drawer w-fit md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn bg-transparent border-0 shadow-none rounded-full  drawer-button"><Menu className="text-white" size={20} /></label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-300 text-base-content min-h-full w-72 py-4">
              {/* Sidebar content here */}
              
        {users?.length === 0 ? (
          <div className="font-bold px-4">Empty</div>
        ) : (
          users?.map((user) => (
            <Link
              key={user._id}
              to={`/message/${user._id}`}
              onClick={() => setChatWith(user)}
              className="flex flex-row items-center p-2 space-x-3 focus:bg-green-100"
            >
                <div className="avatar w-fit">
                  <div className="w-10 rounded-full">
                    <img src={user.picturePath} />
                  </div>
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute z-30 left-3 -bottom-1">
                      <CircleIcon style={{ fill: "green", width: "16px", zIndex: 100 }} />
                    </span>
                  )}
                </div>
                <div className="w-fit text-black">{user.fullName}</div>
            </Link>
          ))
        )}
    
    
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="ml-4 md:ml-0 text-xl flex font-bold">  ChatSphere <MessageCircle className="w-4 h-4 "/></h1>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-green-500 flex items-center justify-center">
                {(currentUser && <img src={currentUser.picturePath} />) || (
                  <span className="font-bold text-white">
                    {currentUser?.fullName.split(0, 1)}
                  </span>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu bg-gray-950 menu-sm dropdown-content mt-3 p-2 shadow  rounded-box w-52 text-gray-800"
            >
              <li>
                <Link to={`/profile/${currentUser?._id}`}>
                  <User className="w-4 h-4" /> Profile
                </Link>
              </li>
              <li>
                <Link to={"/logout"}>
                  <LogOut className="w-4 h-4" /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
