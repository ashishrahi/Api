const {mongoose,Schema} = require('mongoose');
 const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
 },{timestamps:true})
 const User = mongoose.model('User', UserSchema);
 module.exports = User;