const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const { z } = require('zod');


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
