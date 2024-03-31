import express from "express";

const app = express()

app.get("/", (req,res)=>{
    return res.json({
        "msg":"server is healthy"
    })
})

app.listen(3000, ()=>{
    console.log("backend is running on port - 3000")
})