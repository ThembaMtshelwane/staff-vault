import mongoose from "mongoose";

let bucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.once("open", () => {
      bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "filesBucket",
      });
      console.log("GridFS bucket ready");
    });
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Getter function to safely access `bucket`
const getBucket = () => {
  if (!bucket) {
    throw new Error("GridFS bucket has not been initialized yet");
  }
  return bucket;
};

export default connectDB;
export { getBucket };
