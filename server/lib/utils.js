import jwt from 'jsonwebtoken';

// Function to generate a token for a user
//using the userId we will generate a new token

export const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}