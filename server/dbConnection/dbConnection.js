import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConnection = async (cb) => {
  try {
    const URI = process.env.MONGO_URI;

    const mongoConnect = () => {
      mongoose.connect(URI);
    };

    await cb(mongoConnect());
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
