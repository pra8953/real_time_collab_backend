const userModel = require('./../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const signup = async(req,res)=>{
    try{
        
        const {name,email,phone,password} = req.body;
        const userExits = await userModel.findOne({email});
           if (userExits && userExits.isActive === false) {
      // Agar user pehle delete kar chuka tha (isActive:false) to uska record update karo
      const hashedPass = await bcrypt.hash(password, 12);

      const updatedUser = await userModel.findByIdAndUpdate(
        userExits._id,
        {
          name,
          phone,
          email,
          password: hashedPass,
          isActive: true, // wapas active karna
        },
        { new: true }
      );

      const token = await jwt.sign(
        { id: updatedUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.status(200).json({
        success: true,
        message: "Account re-activated and updated successfully",
        token,
      });
    } else if (userExits) {
      return res.status(409).json({
        success: false,
        message: "User already exists, please login",
      });
    }


        
        const hasedPass = await bcrypt.hash(password,12);
        const newUser = new userModel({
            name,
            email,
            phone,
            password:hasedPass
        })

        await newUser.save();

        const token =  await jwt.sign(
            {id:newUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'2h'}
        )

        res.status(201).json({
            success:true,
            message:"User register successfully",
            token
        })

    }catch(err){

        res.status(500).json({
            succes:false,
            message:"Internal server error"
        })

    }
}


const login = async(req,res)=>{
    try{

        const {email,password} = req.body;
        const userExits = await userModel.findOne({email});
        
        if(!userExits){
            return res.status(401).json({
                success:false,
                message:"enter correct details"
            })
        }
        if (userExits.isActive === false) {
            return res.status(403).json({
                success: false,
                message: "Account is deactivated. Please contact support."
            });
            }

        const comPass = await bcrypt.compare(password,userExits.password);
        if(!comPass){
            return res.status(403).json({
                success:false,
                message:"Enter correct password"
            })
        }
        
        const token = await jwt.sign(
            {id:userExits._id},
            process.env.JWT_SECRET,

            {expiresIn:'2h'}
        )
        res.status(200).json({
            success:true,
            message:"User login successfully",
            token
        })

    }catch(err){

        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}


module.exports = {
    signup,
    login
}