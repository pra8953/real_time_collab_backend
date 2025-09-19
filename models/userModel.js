

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    name:{
        type :String,
        required:true
    },
    email:{
        type :String,
        required:true,
        unique:true
    },
    phone:{
        type :String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png", 
    }
    ,
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;