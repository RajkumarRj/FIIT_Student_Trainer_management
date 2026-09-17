import mongoose from "mongoose";

const Mongodb = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGODB_URL);

    console.log("Data base connected successfully");
  } catch (error) {
    console.error("Database connecting issue", error);
    process.exit(1);
  }
};


export default Mongodb;