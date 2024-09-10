const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); // Add this line to use JWT
const User = require('../models/SignupSchema');
const router = express.Router();
router.use(cors());
const upload = multer({
    storage :multer.diskStorage({
        destination:function(req , file , cb){
            cb(null , path.resolve(__dirname , '../public/images/user'))
        },
        filename:function(req,file , cb)
        {
            cb(null, Date.now() + "-" + file.originalname);
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
              return cb(new Error('Please upload an image file'));
            }
            cb(null, true);
          } 
    })
})
const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({success: false, message: 'Access Denied'})
    }
    jwt.verify(token , 'your_jwt_secret_key' , (err,user)=>{
        if(err) return res.status(403).json({success: false, message: 'invailed token'});
        req.user=user;
        next()
    })
 }
 router.post('/signup', upload.single('picture'), async (req, res) => {
  
    try {
      const b = req.body;
      const user = await User.create({
        ...b,
        picture: req.file ? req.file.filename : null
      });
  
      res.json(user);
    } catch (error) {
      console.log('Error in signup', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });
  router.post('/login' , async(req,res)=>{
    const {email , password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
          }
          if (user.password !== password) {
           
            return res.status(401).json({ success: false, message: "Incorrect password" });
          }
         
          const token = jwt.sign({ id: user._id, email: user.email} , 'your_jwt_secret_key' , {expiresIn:'1h'});
          res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
    console.error("Error in login", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    }
  })
  router.get('/current-user' , authenticateToken , async(req,res)=>{
    console.log("current user api")
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user)
        {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({success:true,user})
    } catch (error) {
        console.error('Error fetching user data', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  })
  module.exports  = router;