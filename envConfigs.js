import dotenv from "dotenv";
dotenv.config();
export default {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
};
