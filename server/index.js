import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/ConnectDB.js"

dotenv.config();



const app = express(); 

const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.send("Hello from server");
})

app.listen(PORT, () =>{ 
    console.log(`Server is running on PORT ${PORT}`)
    connectDB()

});
