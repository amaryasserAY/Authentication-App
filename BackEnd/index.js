import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

/****  Global Importing And Using in Any Work  ********/

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect to Mongo Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
