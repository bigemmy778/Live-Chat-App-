import express from 'express'
import { checkAuth, login, signup, updateProfile } from '../controllers/userController.js'
import { protectRoute } from '../middleware/auth.js'

//create all 4 api endpoints for the user
const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);


export default userRouter