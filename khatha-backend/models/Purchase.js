const mongoose=require('mongoose');

const PurchaseSchema=new mongoose.Schema({
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    date:{type: Date,default: Date.now,},
    name:{type:String,required:true},
    cost:{type:Number,required:true}
});
module.exports= mongoose.model("Purchase",PurchaseSchema);