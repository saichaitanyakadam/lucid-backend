import mongoose from "mongoose";

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `connected to database host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};
export { connect };
