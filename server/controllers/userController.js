//in this file we create the user 
//Allow the user to login && authenticate the user 
//create the function && using that we can update the user profile


import bcrypt from 'bcryptjs'
import User from "../models/user.js";
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

//user sign up function

//Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body; //from the request body we will get the data

    try{
         if(!fullName || !email || !password || !bio){
             return res.json({success: false, message: 'Missing Details' })
         }
         
         const user = await User.findOne({email});

         if(user){
            return res.json({ success:false, message: "Account already exists" })
         }

         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(password, salt);

         //data for the new user
         const newUser = await User.create({ 
            fullName, email, password: hashedPassword, bio
         });

         const token = generateToken(newUser._id)

         res.json({ success:true, userData: newUser, token, message: "Account created successfully"})

    } catch(error){
        console.log(error.message);


        res.json({ success: false, message: error.message})
    }
}


// Controller to login a user
export const login = async (req, res) =>{
   try{
    const {  email, password } = req.body; //from the request body we will get the data
    const userData = await User.findOne({ email });
    if (!userData) {
        return res.json({ success: false, message: "Invalid credentials" });
    }

     const isPasswordCorrect = await bcrypt.compare(password, userData.password);
     
     
     if (!isPasswordCorrect){
      return res.json({ success: false, message: "Invalid credentials" })
  }

     const token = generateToken(userData._id)

   //   res.json({ success:true, userData: newUser, token, message: "Login successfully" })
     res.json({ success:true, userData: userData, token, message: "Login successfully" })
   } catch ( error ) {
      console.log(error.message);
      res.json({success: false, message: error.message})
   }  
}



// Controller to check if user is authenticated
export const checkAuth = (req, res)=>{
    res.json({success: true, user: req.user});
}


//Controller to update user profile details
export const updateProfile = async (req, res)=>{
   try{
        const { profilePic, bio, fullName } = req.body;
        
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
          updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true}); 
        } else{
            const upload = await cloudinary.uploader.upload(profilePic) //upload pic to cloudinary
            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true})
        }
        res.json({success: true, user: updatedUser})
        
   } catch (error) {
       console.log(error.message);

        res.json({success: false, message: error.message})
   }
}


