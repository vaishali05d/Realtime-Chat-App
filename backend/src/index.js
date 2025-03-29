import express from "express";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParse());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
 app.use("/api/auth",authRoutes);
 app.use("/api/messages",messageRoutes);

 if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(_dirname,"../frontend/dist")));
 }

 server.listen(PORT, ()=>{
    console.log("Server is running on port:",PORT);
    connectDB();
 });
