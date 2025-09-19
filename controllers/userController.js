const userModel = require('./../models/userModel');
const userdetailsModel = require('../models/userdetailsModel');
const bcrypt = require('bcrypt');

async function getUser(id) {
    try{

        const user = await userModel.findById(id).select("name email phone avatar");
        return user.toObject();

    }catch(err){
        console.error(err);
    }
}


async function getUserDetails(id){
    try{
        const user = await userModel.findById(id).select("name email phone avatar createdAt");
         if (!user) {
            return { error: "User not found" };
         }

        const userDetail = await userdetailsModel.findOne({user_id:id}).select('dob location portLink ');
        const userObj = user.toObject(); 
        userObj.userDetail = userDetail ? userDetail.toObject() : null;
        return userObj;

    }catch(err){
         console.error(err);
         
    }
}


async function updateUserDetails(user_id,data){

    try{
        const updated = await userdetailsModel.findOneAndUpdate( 
        { user_id: user_id },
        data,
       { new: true });
        const {dob,location,portLink} = data
       if(!updated){
            const details = new userdetailsModel({dob,location,portLink,user_id:user_id});
            await details.save();
       }
       

        return updated ? updated.toObject() : { error: "User details not found" };

    }catch(err){
         console.error(err);
        

    }
    
}

async function updateUser(id,data){
    try{
        const update = await userModel.findByIdAndUpdate(id,data,{new:true});
        return update.toObject();

    }catch(err){
        console.error(err);

    }
}



async function deleteUser(id) {

    try{
        const userDelete = await userModel.findByIdAndUpdate(id,{isActive:false},{new:true});
        return userDelete.toObject();
    }catch(err){
        console.error(err);
        return;
    }
}


// async function updatePassword(id,data){
//     try{
//         const {oldPassword,newPassword} = data;
//         const userExits = await userModel.findOne({id});
//        const passCompare = await bcrypt.compare(oldPassword,userExits.password);
//        if(!passCompare){
//             return res
//        }

//     }catch(err){

//     }
// }

const updatePassword = async(req,res)=>{
     try{
        const {oldPassword,newPassword} = req.body;
        const id = req.userId;
        const userExits = await userModel.findOne({ _id: id });
        if (!userExits) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

       const passCompare = await bcrypt.compare(oldPassword,userExits.password);
       if(!passCompare){
            return res.status(403).json({
                success:false,
                message:"Enter correct Current password"
            })
       }

       const hasPass = await bcrypt.hash(newPassword,12);
       const user = await userModel.findByIdAndUpdate(id,{password:hasPass},{new:true});
       res.status(200).json({
        success:true,
        message:"Password updated successfully!"
       })

    }catch(err){
        console.error(err);
        return;

    }
}

module.exports = {
    getUser,
    getUserDetails,
    updateUserDetails,
    updateUser,
    deleteUser,
    updatePassword
}