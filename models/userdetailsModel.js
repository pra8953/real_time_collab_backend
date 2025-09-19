const mongoose = require('mongoose');
const userDeatils = mongoose.Schema({

    dob:{
        type:String,
        // required:true
    },
    location:{
        type:String,
        // required:true
    },
    portLink:{
        type:String,
        // required:true
    },
    user_id:{
        type:String,
        // required:true
    }
})

const userDeatilsModel = mongoose.model('userDetails',userDeatils);

module.exports = userDeatilsModel;