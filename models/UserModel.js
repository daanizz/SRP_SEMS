import mongoose from "mongoose";

const User=new mongoose.Schema({
    Full_Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    HashPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["Teacher","Principal","Staff"]
    }
},{
    timestamps:true
});

export default mongoose.model("User",User);