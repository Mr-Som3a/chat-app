import mongoose from "mongoose";

const dataBase = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to mongodb server"))
    .catch(() => {
      console.log("connetion to database failed");
      process.exit(1);
    });
};

export default dataBase;
