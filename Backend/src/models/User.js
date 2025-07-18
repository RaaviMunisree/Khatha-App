const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    shopName:{type:String,required:true}
})

module.exports = mongoose.model("User", UserSchema);
