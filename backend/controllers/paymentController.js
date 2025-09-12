const Payment=require('../models/Payment');
const User=require('../models/User');

exports.addPayment=async(req,res)=>{
    const {_id,date,cost}=req.body;
     try{
        const existing=await User.findById({_id});
        if(!existing) return res.json({message:"User doesnot exist"});
        const newPayment= await Payment.create({ customer: _id,  date,cost});
        await newPayment.save();
        res.status(201).json({ newPayment });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }  
};

exports.getPayments= async (req,res)=>{
    const {_id}=req.body;
    try{
      const existing=await User.findById({ _id });
      if(!existing) return res.json({message:"User doesnot exist"});
      const payments=await Payment.find({customer:_id});
      return res.json(payments);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};