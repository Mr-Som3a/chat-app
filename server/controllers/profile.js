import User from "../models/users.model.js"

const ProfileImg = async (req,res) => {
    try {
        const {id} = req.params
        const photoPath = `/public/assets/${req.file?.filename}`||null
        console.log(req.user)
        
        const updatedUser = await User.findByIdAndUpdate(
            {_id:id},{picturePath:photoPath,updatedAt: Date.now()}
        ) 
        
        res.status(200).json({message:"update success",user:updatedUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export default ProfileImg