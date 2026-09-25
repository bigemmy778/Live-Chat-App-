import express from "express"
import { protectRoute } from "../middleware/auth.js"
import { getMessages, getUserForSideBar, markMessageSeen, sendMessage } from "../controllers/messageController";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSideBar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id", protectRoute, markMessageSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage)


export default messageRouter
