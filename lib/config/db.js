import mongoose from "mongoose";
export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://<thinkBolt:Vd2MCdz5reWdP6aO@mycluster1.rs796.mongodb.net/?retryWrites=true&w=majority&appName=myCluster1/blog-app')
  console.log("db connected");
}