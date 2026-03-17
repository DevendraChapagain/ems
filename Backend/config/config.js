import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined in environment variables");
}


if(!process.env.JWT_SECRET){
    throw new Error("JWT Token is not Defined in the environment varibales");
}


const config = { 
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET

};
export default config;