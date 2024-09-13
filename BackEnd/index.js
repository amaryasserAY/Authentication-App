import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

/****  Global Importing And Using in Any Work  ********/
dotenv.config();
const app = express();
const PORT = 3000;
const __dirname = path.resolve();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));

app.get("*", (res, req) => {
  res.sendFile(path.join(__dirname, "FrontEnd", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect to Mongo Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
