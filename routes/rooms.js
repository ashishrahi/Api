const express = require('express')
const router = express.Router();
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const createError = require('../utils/error')

//Create a Room
router.post('/',async(req,res)=>{
    
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//Get a Room
router.get('/:id',async(req,res)=>{
    try {
        const Room = await Room.findById(req.params.id);
        res.status(200).json(Room); 

    } catch (error) {
        res.status(500).json(err)
    }
})
//Get all Room
router.get('/',async(req,res)=>{
    const username = req.body.user;
    const catName = req.query.cat;
 
 try {
      let posts;
      if(username){
        posts = await Post.find({username})
      }else if(catName){
         posts = await Post.find({categories:{$in:[catName]}})
      }
      else{
         posts= await Post.find();
      }
      res.status(200).json(posts);
         
     } catch (error) {
         res.status(500).json(error)
     }
 })

//Update a room
router.put('/:id',async(req,res)=>{
    try {
        const room = await Room.findById(req.params.id);
       
        if (post.username === req.body.username) {
          try {
                const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true} );
              res.status(200).json(updatedRoom);  
            } catch (error) {
                res.status(500).json(error);
            }
            
        } else {
        res.status(401).json("You can only Update Your Post");
            }
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//Delete a Post

router.delete('/:id',async(req,res)=>{
    try {
        const room = await Room.findById(req.params.id);
       
        if (room.username === req.body.username) {
          try {
                const deletedRoom = await Room.delete();
              res.status(200).json('Room has been deleted....');  
            } catch (error) {
                res.status(500).json(err);
            }
            
        } else {
        res.status(401).json("You can only Delete Your Room");
            }
        
    } catch (error) {
        res.status(500).json(error)
    }
})








module.exports = router;
