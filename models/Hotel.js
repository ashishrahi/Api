const {mongoose,Schema} = require('mongoose');
const HotelSchema = new mongoose.Schema({
hotelname:{
        type:String,
        required:true,
    },
    room:{
        type:mongoose.Type.Schema.ObjectId,
        required:true,

    },
    type:{
        type:String,
        required:true,
    },
    city:{
      type:String,
      required:true,
    },
    address:{
        type:String,
        required:true,
    },
    distance:{
        type:String,
        required:true,
    },
    photos:{
        type:Array,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:0,
    },
    rooms:{
        type:[String],
    },
    cheapestPrice:{
        type:Number,
        required:true,
    },
    featured:{
            type:Boolean,
            default:false,
    }
},
{timestamps:true}
);

const Hotel = mongoose.model('Hotel', HotelSchema);

 module.exports = Hotel;
