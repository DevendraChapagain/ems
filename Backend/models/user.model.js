import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"User name is required"],
        unique: false,
    },
    email: { 
        type : String,
        required: [true,"Email is required"],
        unique: [true,"Email must be unique"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    role:{
        type: String,
        required: [true,"Role is required"],
        enum :['admin','employee','hr','manager'],
        default:'employee',
    }  
});

const User = mongoose.model("User", userSchema);
export default User;