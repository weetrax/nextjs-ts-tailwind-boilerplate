import { connect } from "mongoose";
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = "mongodb+srv://webapp:tripsti06590@tripstiwebapp-xipya.mongodb.net/Boilerplate",
} = process.env;

export const connectToDatabase = () => connect(MONGO_URI);
