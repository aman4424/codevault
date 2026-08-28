const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt =require('bcrypt');
const emailServices=require("../services/emailServices")
const validateName=(name)=>{
    if(typeof name!=='string'||name.trim().length===0){
        const error=new Error("Please enter a valid name."); 
        error.status=400;
        throw error; 
    }
    if(name.trim().length>50){
        const error=new Error("Name should not be more than 50 characters long.");
        error.status=400;
        throw error;
    }
}

const validateEmail=(email)=>{
    if(typeof email!=="string"){
        const error=new Error("Please enter a valid email.");
        error.status=400;
        throw error;
    }
    const trimmedEmail=email.trim();
    if(trimmedEmail.length ===0){
        const error=new Error("Please enter a valid email.");
        error.status=400;
        throw error;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(trimmedEmail)){
        const error = new Error("Please enter a valid email.");
        error.status = 400;
        throw error;
    }

    
}
const validatePassword=(password)=>{
    //check type and white space
    if(typeof password!=='string'){
        const error=new Error("Please enter a valid password");
        error.status=400;
        throw error;
    }
    if(password.trim().length===0){
        const error=new Error("Password cannot be empty");
        error.status=400;
        throw error;
    }
   
    if(password.length<8){
        const error=new Error("Password must be 8 characters or more");
        error.status=400;
        throw error;
    } 
    if(password.length>64){
        const error=new Error("Password cannot be more than 64 characters long");
        error.status=400;
        throw error;
    }
    // check uppercase,lowercase and spcl. char
    if(!/[A-Z]/.test(password)){
        const error=new Error("At least one upper case letter required");
        error.status=400;
        throw error;
    }
    if(!/[a-z]/.test(password)){
         const error=new Error("At least one lower case letter required");
        error.status=400;
        throw error;
    }
    if(!/[0-9]/.test(password)){
         const error=new Error("At least one digit required");
        error.status=400;
        throw error;
    }
    if(!/[^\sA-Za-z0-9]/.test(password)){
        const error=new Error("At least one special character required");
        error.status=400;
        throw error;
    }
    
    
}

const checkDuplicateEmail=async (email)=>{
    const existingUser = await User.findOne({email});
    if(existingUser!=null){
        const error=new Error("Email already exists");
        error.status=409;
        throw error;
    }

}
const validateLoginPassword=(password)=>{
    if(typeof password!=='string'||password.length===0){
        const error=new Error("Please enter a valid password");
        error.status=400;
        throw error;
    }
}
const checkExistingEmail=async (email)=>{
    const existingUser=await User.findOne({email});
    if(existingUser===null){
    const error=new Error("Invalid email or password.");
        error.status=401;
        throw error;
    }
    return existingUser;
}
const hashPassword= async(password)=>{
    const saltRounds=10;
    const hash= await bcrypt.hash(password,saltRounds);
    return hash;
}
const generateAuthToken=(user,expiry)=>{
    return jwt.sign(
        {
            userId:user._id,
            name:user.name,
            email:user.email
        },process.env.JWT_SECRET,
        {
            expiresIn:`${expiry}`
        }
    )
}
const register=async(userData)=>{
    const{name,email,password}=userData;
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    const normalizedEmail = email.trim().toLowerCase();
    await checkDuplicateEmail(normalizedEmail);
    const hashedPassword=await hashPassword(password);
    
    try {
        const result=await User.create({name,email:normalizedEmail,password:hashedPassword});
        const token= generateAuthToken(result,'15d');
        return {
        id:result._id,
        name:result.name,
        email:result.email,
        token
        };
    } catch (error) {
        if(error.code===11000){
            const newError=new Error("Email already exists");
            newError.status=409;
            throw newError;
        }
        throw error;
    }
    
}

const login=async(userData)=>{
    const{email,password}=userData;
    validateEmail(email);
    validateLoginPassword(password);
    const normalizedEmail = email.trim().toLowerCase();
    const user=await checkExistingEmail(normalizedEmail);
    const passwordIsMatching=await bcrypt.compare(password,user.password);
    if(!passwordIsMatching){
        const error=new Error("Invalid email or password.");
        error.status=401;
        throw error;
    }
    const token= generateAuthToken(user,'15d');
        return {
        id:user._id,
        name:user.name,
        email:user.email,
        token
    };
  
        
}

const generateRecoveryToken= (user)=>{
    return jwt.sign(
        {
            userId:user._id,
            email:user.email
        },
        process.env.FORGOT_PASSWORD_JWT_SECRET,
        {
            expiresIn:'2m'
        }
    )
}


const forgotPassword= async (userData)=>{
    const {email}=userData;
    validateEmail(email);
    const normalizedEmail=email.trim().toLowerCase();
    const user=await User.findOne({email:normalizedEmail});
    if(user==null){
        return {
            message:"A reset link has been sent if an account exists with this email"
        };
    }
    const token=generateRecoveryToken(user);
    const url=`${process.env.RESET_PASSWORD_ROUTE}/${token}`;
    await emailServices.sendResetPasswordURL(url,user.email);
    
    return {
            message:"A reset link has been sent if an account exists with this email"
        };
  

}

module.exports={
    register,login,forgotPassword,
}