import mongoose from "mongoose";

const Student=new mongoose.Schema({
     Full_Name:{
        type:String,
        required:true,
    },
    DOB:{
        type:Date,
    },
    Behaviour:{
        type:String,
        required:true
    },
    hobby:{
        type:String,
        required:true
    },
    EmergencyContact:{
        type:Number,
        required:true
    },
    ConsultantDr:{
        type:String
    },
    DrNumber:{
        type:Number
    },
    ClassID:{
        type:Number,
        required:true
    },
    HealthIssues:{
        type:String,
    }
});


export default mongoose.model("Student",Student);