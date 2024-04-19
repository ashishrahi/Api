const express = require('express')
const Hotel   = require('../models/Hotel')
const router = express.Router();

//Create a Hotel
router.post('/',async(req,res)=>{
    const hotel = new Hotel(req.body)

try {
    const savedHotel = await hotel.save();
    res.status(200).json(savedHotel);
}
 catch (error) {
    res.status(500).json(error)
}})

//Get a category
router.get('/:id',async(req,res)=>{
    try {
        const aHotel = await Hotel.findById(req.params.id);
        res.status(200).json(aHotel);
        
    } catch (error) {
        res.status(500).json(error)
    }
})


//Get all category
router.get('/',async(req,res)=>{
try {
    const allHotel = await Hotel.find();
    res.status(200).json(allHotel);
} catch (error) {
    res.status(500).json(error)
}
})


//Update a category
router.put('/:id',async(req,res)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json(updateHotel);
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete a category

router.delete('/:id',async(req,res)=>{
    try {
        const deleteaHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
