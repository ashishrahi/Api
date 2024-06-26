const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Room = require('../models/Room')

//Get a User
router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
        
    } catch (error) {
        res.status(500).json(error)
    }
})


//Update a User
router.put('/:id',async(req,res)=>{
if(req.body.userId===req.params.id){

   if(req.body.password)
   {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;
}
try {
       const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).json(updatedUser); 
    } catch (error) {
        res.status(500).json(error)
    }
}else{
    res.status(401).json('You can update only you account')
}
})
//Delete a User

router.delete('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id)
    {
      
    try{
      const user = await User.findById(req.params.id);
    
        try {
            await Post.deleteMany({username:user.username});
           await User.findByIdAndDelete(req.params.id);
           res.status(200).json("User has been deleted...."); 
        } 
        catch (error) {
            res.status(500).json(error)
        }}
        
        catch(error){
            res.status(404).json('User not found')
        }
    }
    else{
        res.status(401).json('You can delete only you account')
    }
    })





module.exports = router;
