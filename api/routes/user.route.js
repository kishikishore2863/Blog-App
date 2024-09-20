const express = require('express')
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message : " hi from user route"})
})
module.exports= router;