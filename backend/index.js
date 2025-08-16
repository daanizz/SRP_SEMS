import express from "express";
import dotenv from "dotenv";


const app=express();

dotenv.config();

const PORT=process.env.PORT || 5050;

app.get("/",(req,res)=>{
    res.send("Frontend to be added here..")
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});