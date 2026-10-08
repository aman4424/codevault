const express =require('express');
const router=express.Router();
const verifyToken=require('../middleware/verifyToken')
const authController=require('../controllers/authController');
router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/forgot-password',authController.forgotPassword);
router.post('/reset-password',authController.resetPassword);
router.get('/verify',verifyToken,(req,res)=>{
    res.status(200).json({
        authenticated:true,
        user:req.user
    })
})
module.exports=router;