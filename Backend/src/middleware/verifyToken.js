const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({
            message:"Authentication required"
        });
    }
    const [scheme,token]=authHeader.split(" ");
    if(scheme!=="Bearer"||!token){
        return res.status(401).json({
            message:"Invalid authorization header"
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({
                message:"Session expired.Please log in again."
            });
        }
        if(error.name==="JsonWebTokenError"){
            return res.status(401).json({
                message:"Invalid token"
            });
        }
        return res.status(401).json({
            message:"Authentication failed"
        });
    }
}
module.exports=verifyToken