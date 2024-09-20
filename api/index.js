
const express = require("express");
const cors = require("cors")
const mongoose = require('mongoose');
const dotenv= require('dotenv')
const UserRoutes = require('./routes/user.route')
const authRoutes =require('./routes/auth.route')

dotenv.config()

mongoose.connect(process.env.MONGO_DB).then(
    console.log('mongoDb is connected')
)

const app =express()
app.use(express.json());
app.use(cors())




app.route('',UserRoutes)
app.use('/api/auth',authRoutes);



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message =err.message || 'Internal Server Erorr';
    req.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })

})







app.listen(3000,()=>{
    console.log("server is running on port 3000")
});