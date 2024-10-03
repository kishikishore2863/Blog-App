const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message : " hi from user route"})
})
router.put('/update:userId',verifyToken,updateUser);
module.exports= router;