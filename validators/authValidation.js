const joi = require('joi');

const signupValidation = (req,res,next)=>{
    try{
        const userSchema = joi.object({
            name:joi.string().min(3).max(50).required(),
            email:joi.string().email().required(),
            phone:joi.string().pattern(/^[6-9]\d{9}$/).required(),
            password:joi.string().min(6).required(),
        })

        const {error} = userSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            })
        }
        next();

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}

const loginValidation = (req,res,next)=>{
    try{
const userSchema = joi.object({
           
            email:joi.string().email().required(),
            
            password:joi.string().min(6).required(),
        })

        const {error} = userSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                message:"Bad request"
            })
        }
        next();
    }catch(err){

    }
}

module.exports = {
    signupValidation,
    loginValidation
}