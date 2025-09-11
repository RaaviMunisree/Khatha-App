const express=require('express');
const {auth}=require("../middleware/auth");
const {register,login}=require('../controllers/authController');
const router=express.Router();

router.post('/register',register);
router.post('/login',auth,login);

module.exports=router;