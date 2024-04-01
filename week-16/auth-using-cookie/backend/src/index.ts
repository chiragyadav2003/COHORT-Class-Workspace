import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt,{ JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = 'mySecret123';
const port = 3000

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

app.get("/health", (req,res)=>{
    return res.json({
        msg:"server is healthy"
    })
})

app.post("/signin", async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    //do db validation

    const token = await jwt.sign({id:1},JWT_SECRET);
    
    res.cookie("token", token)
    res.send("logged in !!")
})


app.get("/user", async(req,res)=>{
    const token = req.cookies.token;
    const decoded = await jwt.verify(token,JWT_SECRET) as JwtPayload;

    //get email of user from db

    res.send({userId:decoded.id})
})

app.post("/logout", (req,res)=>{
    res.clearCookie("token")
    res.json({msg:"logged out !"})
})

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "../src/index.html"))
})


app.listen(port, ()=>{
    console.log(`server is running as http://localhost:${port}`)
})