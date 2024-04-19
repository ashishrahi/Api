const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const hotelsRoute = require('./routes/hotels')
const roomsRoute = require('./routes/rooms')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const app = express();
var cors = require('cors') 
const path = require('path')


mongoose.connect('mongodb://127.0.0.1:27017/HotelBooking');
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/Images',express.static(path.join(__dirname,"/Images")))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,req.body.name)
    }
  })
  
  const upload = multer({ storage: storage })
    app.post('/api/upload',upload.single('file'),(req,res)=>{
        res.status(200).json('File has been uploaded');
    })

//middleware

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success:false,
        message:errorMessage,
        status:errorStatus,
        stack:err.stack,

    });
})

app.listen(5600);
