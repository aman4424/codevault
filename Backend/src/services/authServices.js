const User=require("../models/User")
const bcrypt =require('bcrypt')
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
    if(password.trim().length==0){
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
const hashPassword= async(password)=>{
    const saltRounds=10;
    const hash= await bcrypt.hash(password,saltRounds);
    return hash;
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
        return {
        id:result._id,
        name:result.name,
        email:result.email
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

module.exports={
    register,
}