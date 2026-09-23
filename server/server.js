import express from 'express'
import "dotenv/config"
import http from 'http'
import cors from 'cors'
import { connectDB } from "./lib/db.js";

//creatre Express app and HTTP server
const app = express();
const server = http.createServer(app)

// Middleware setup
app.use(express.json({ limit: '4mb' }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));

//connect to mongdb
await connectDB()

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT:" + PORT));