import { useEffect, useRef, useState } from "react";
import { Edit, Mail, User, Camera } from "lucide-react";
import useUserStore from "../store/user";
import Avatar from "../components/avatar";
import LoadingSpinner from "../components/loadingSpinner";


const ProfilePage = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const checkAuth = useUserStore((state) => state.checkAuth);
  const isUpdatingProfile =useUserStore(state => state.isUpdatingProfile)
  const updateProfilePic = useUserStore(state=> state.updateProfilePic)
  const [selectedImg,setSelectedImg] = useState(null)
  const fileRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if(isEditing){
      checkAuth()
    }
  }, [isEditing]);
  
console.log('re')
  const handleSave = async() => {
    try {
        await updateProfilePic({ picturePath: selectedImg ,id:currentUser._id});
        setIsEditing(false)
        setSelectedImg(null)
        location.reload();
      } catch (error) {
        console.log(error)
      }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file||!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);


     reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      
    };
  };

    
  
  

  if (isUpdatingProfile) {
    return (
      <>
        <div className="flex justify-center items-center w-full min-h-full ">
          <div className="card w-96 bg-base-100 shadow-xl p-6">
            
           
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center w-full min-h-full ">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        {isUpdatingProfile?<LoadingSpinner />:(
          <>
          
          {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar src={selectedImg || currentUser?.picturePath} alt="avatar" />
            <input
              type="file"
              hidden
              name="image"
              onChange={handleFileUpload}
              ref={fileRef}
              disabled={isUpdatingProfile}
              />
            {isEditing && (
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 btn btn-sm btn-circle btn-primary"
              >
                <Camera size={16} />
              </button>
            )}
          </div>
          
        </div>

        {/* Info */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <User size={18} className="text-primary" />
            
            <p className="text-lg font-semibold">{currentUser?.fullName}</p>
          
          </div>

          <div className="flex items-center gap-2">
            <Mail size={18} className="text-primary" />

            <p className="text-sm text-gray-600">{currentUser?.email}</p>
          </div>
        </div>
        </>)}

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setSelectedImg(null)
                  setIsEditing(false)}}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button
            className="btn btn-outline btn-primary w-full flex items-center gap-2"
            onClick={() => setIsEditing(true)}
            >
              <Edit size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
