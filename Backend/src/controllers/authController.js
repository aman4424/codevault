const authServices=require('../services/authServices')
const register=async(req,res)=>{
   try {
     const result= await authServices.register(req.body);
     return res.status(201).json(result);
   } catch (error) {
      return  res.status(error.status||500).json({
        message:error.message||"Internal Server Error",
    });
   }
    
}
module.exports={
    register,

};