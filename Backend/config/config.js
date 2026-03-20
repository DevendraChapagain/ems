import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT Token is not Defined in the environment varibales");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT Token is not Defined in the environment varibales");
}

const config = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  MONGO_URL: process.env.MONGO_URL,
};
export default config;
