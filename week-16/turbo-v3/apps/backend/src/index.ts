import express from "express";
import {BACKEND_URL} from "@repo/common/config"

const app = express()

app.get("/", (req,res)=>{
    return res.json({
        "msg":"server is healthy"
    })
})

console.log("backend url = ",BACKEND_URL)

app.listen(3004, ()=>{
    console.log("backend is running on port - 3004")
})

//*NOTE: in tsconfig.json file we will remove (outdir:"./dist") to remove error

//NOTE: "dev": "tsc -b && node dist/index.js" remove this build command and esbuild