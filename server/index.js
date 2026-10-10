import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import userRouter from "./Routes/user.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import assistantRouter from "./Routes/assistant.route.js";

dotenv.config();

const app = express(); 

const privateCors =
  cors({

    origin: [
      "http://localhost:5173"
    ],

    credentials: true

  });

  const publicCors =
  cors({
    origin: "*",
  });





app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Hello from server");
})

app.use("/api/auth",privateCors , authRouter)
app.use("/api/user",privateCors , userRouter)
app.use("/api/assistant",publicCors, assistantRouter)


const PORT = process.env.PORT || 5000;


app.listen(PORT, () =>{ 
    console.log(`Server is running on PORT ${PORT}`)
    connectDB()

});
