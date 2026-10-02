import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express(); 

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Hello from server");
})

app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 5000;


app.listen(PORT, () =>{ 
    console.log(`Server is running on PORT ${PORT}`)
    connectDB()

});
