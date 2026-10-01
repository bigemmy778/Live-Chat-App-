import "dotenv/config"
import express from 'express'
import http from 'http'
import cors from 'cors'
import { connectDB } from "./lib/db.js";
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server  } from 'socket.io';

//creatre Express app and HTTP server
const app = express();
const server = http.createServer(app)

//Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

//store online users
export const userSocketMap = {} // { userId: socketId }

// Socket.io connection handler
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId; 
    console.log("User Connected", userId);

    if(userId) userSocketMap[userId] = socket.id;
    
    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", userId);
        // Only remove the mapping if this socket is still the active one for this user
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
        // delete userSocketMap[userId]
        // io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// Middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(cors());


//Route setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages",  messageRouter)


//connect to mongdb
await connectDB()

if(process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log("Server is running on PORT:" + PORT));
}

// Export server for Vercel
export default server;