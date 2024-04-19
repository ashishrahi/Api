const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
    

//Register
router.post('/register',async(req,res)=>{
   try { 
    const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(req.body.password,salt);

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
        country:req.body.country,
        city:req.body.city,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
      
      
      });
       
    
     const user = await newUser.save();
         res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login
router.post('/login',async(req,res,next)=>{
try {
  const user = await User.findOne({username:req.body.username})
console.log(user);
  if(!user) return next(createError(404,"User not found!"))

  const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)

      const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},"sdfsdf")
  
      if(!isPasswordCorrect) return next(createError(404,"Wrong password or username!"));
  const{password,isAdmin,...otherDetails} = user._doc;
  res.cookie("access_token",token,{
    httpOnly:true,
  }).status(200).json(user);
}

catch (error) {
    next(error);
}
})



module.exports = router;
