import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app.js";
import mongoose from "mongoose";

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("UNCAUGHT EXCEPTION OCCURED");
  process.exit(0);
});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then((obj) => {
  console.log("Connection with Database success");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server up & Running vrooooomm...");
});
