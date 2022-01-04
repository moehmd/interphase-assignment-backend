import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoute from "./routes/blogRoute.js";
import authorRoute from "./routes/authorRoute.js"

dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("images"));

app.use('/api/blogs', blogRoute);
app.use('/api/authors', authorRoute);

app.listen();
  
export default app
