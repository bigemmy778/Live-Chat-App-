import mongoose from "mongoose";

//time stamps auto adds the date/time user was created
const userSchema = new mongoose.Schema({
     email: {type: string, required: true, unique: true },
     fullName: {type: string, required: true },
     password: {type: string, required: true , minlength: 6},
     profilePic: {type: string, default: ""},
     bio: {type: string},
}, {timestamps: true})


const User = mongoose.model("User", userSchema)

export default User;