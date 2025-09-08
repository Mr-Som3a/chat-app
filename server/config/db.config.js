import mongoose from "mongoose";
import { seedUsers } from "../models/seeds.js";

const dataBase = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to mongodb server");
    })
    .catch((error) => {
      console.log("connetion to database failed", error);
    });
};

export default dataBase;
