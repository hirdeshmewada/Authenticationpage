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
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://authenticationpage-coral.vercel.app"],
  credentials: true
}));

app.use(cookieParser());

// Routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});
app.get("/", (req, res) => {
  res.send("Hello from the root route!");
});

app.use("/auth", UserRouter);

// Root Route - to display a message when the server is accessed at the root URL
app.get("/test", (req, res) => {
  res.send("<h1>Server is running fine</h1>");
});

// Database Connection
mongoose.connect(
  process.env.MONGOOSEID,
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
