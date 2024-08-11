import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from './db.js';
import cookieParser from "cookie-parser";
dotenv.config();
import { UserRouter } from "./routes/user.js";

const app = express();

// Middleware
app.use(express.json());  // Add parentheses to call the function
app.use(cors(
  {origin:["http://localhost:5173"],
  credentials:true  
},
));
app.use(cookieParser())
// Routes
app.use("/auth", UserRouter);

// Database Connection
mongoose.connect(
  "mongodb+srv://hirdeshrajput143:Hirdesh123@cluster0.xxrqybj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("MongoDB Connected"))
 .catch((error) => console.log("MongoDB connection error:", error));

// Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is Running on port", process.env.PORT || 3000);
});
