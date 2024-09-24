const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const { z } = require('zod');
const jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
const errorHandler = require('../utils/erorr')
dotenv.config()


const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});





exports.signup = async (req, res) => {
  console.log(req.body);


  const validation = signupSchema.safeParse(req.body);
  
  if (!validation.success) {

    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.errors,  
    });
  }

  const { username, email, password } = validation.data;

  try {

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already in use",
      });
    }


    const hashedPassword = bcryptjs.hashSync(password, 10);


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });


    await newUser.save();


    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during signup",
    });
  }
};




exports.signin=async(req,res,next)=>{
  const signinSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });


  const validation = signinSchema.safeParse(req.body);


 if(!validation.success){
  return res.status(400).json({message:"invalid username or password"})
 }



  const{username,password}=validation.data
  const dbUser = await User.findOne({username})
  const decode = await bcryptjs.compareSync(password,dbUser.password)
  

try {
  if(!dbUser){
    return res.status(500).json({message:"invalid username or password"})
  }
  if(!decode){
    return res.status(400).json({message:"invalid username or password"})
  }
  const token =  jwt.sign({id:dbUser._id},process.env.JWT_SECERET)
  const {password:pass,...rest}=dbUser._doc
  res.status(200).cookie('access_token',token,{
      httpOnly:true}).json(rest)

} catch (error) {
  console.error('Signin error:', error);
  res.status(500).json({ message: "An error occurred during signin" });
}
 
}

exports.google =async (req,res,next)=>{
 const {name,email,googlePhotoUrl}=req.body;
 try{
  const user =await User.findOne({email})
  if(user){
    const token =jwt.sign({id:user._id},process.env.JWT_SECERET)
    const {password,...rest}=user._doc;
    res.status(200).cookie('access_token',token,{
      httpOnly:true,
    }).json(rest)
  }
  else{
    const generatedPassword =Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
    const newUser =new User({
      username :name.toLowerCase().split(' ').join('')+ Math.random().toString(9).slice(-4),
      email,
      password:hashedPassword,
      profilepicture:googlePhotoUrl
    })
    await newUser.save()
    const token =jwt.sign({id:newUser._id},process.env.JWT_SECERET)
    const {password,...rest}=newUser._doc;
    res.status(200).cookie('access_token',token,{
      httpOnly:true,
    }).json(rest)
    
  }
 }catch(error){
  console.log(error)
 }
}

