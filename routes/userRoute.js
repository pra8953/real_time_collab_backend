const router = require('express').Router();
const verifyToken = require('./../middlewares/verifyToken');
const {getUser, updateUser, getUserDetails, updateUserDetails, deleteUser, updatePassword} = require('./../controllers/userController');
router.get('/me',verifyToken,async(req,res)=>{
    try{
        const user = await getUser(req.userId);
        res.status(200).json({
            success:true,
            data :user
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
})

router.put('/updateUser',verifyToken,async(req,res)=>{
    try{
        const  updatedUser = await updateUser(req.userId,req.body);
        res.status(200).json({
            success:true,
            message:"User updated successfully!"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})


router.get('/getUserDetails',verifyToken,async(req,res)=>{
    try{

        const userDetails = await getUserDetails(req.userId);
        res.status(200).json({
            success:true,
            data:userDetails
        })

    }catch(err){
         res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
})


router.put('/updateUserDetails',verifyToken,async(req,res)=>{
    try{
        const user = await updateUserDetails(req.userId,req.body);
        return res.status(200).json({
            success:true,
            message:"User updated successfully"
        })

    }catch(err){
         res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
})


router.delete('/deleteUser',verifyToken,async(req,res)=>{
    try{
        const user = await deleteUser(req.userId);
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    }catch(err){
          res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})

router.put('/updatePassword',verifyToken,updatePassword);
module.exports = router;