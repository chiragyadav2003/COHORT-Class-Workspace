import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

//create redis client
const client = createClient();
client.on('error', (err) => console.log("Redis client error ", err));

app.post("/submit", async (req, res) => {
    const { problemId, code, language } = req.body;

    //problems are sent to queue using postman body json
    /* 
        {
            "problemId":"problem1",
            "code":"code1",
            "language":"c++"
        }
    */

    //how to access pushed data inside queue "problems"
    /*
        docker exec -it my-redis /bin/bash
        root@f8d4df60bc8f:/data# redis-cli
        127.0.0.1:6379> RPOP problems
        "{\"code\":\"code1\",\"language\":\"c++\",\"problemId\":\"problem1\"}"
        127.0.0.1:6379> RPOP problems
        (nil)
        127.0.0.1:6379>
    */

    try {
        await client.lPush("problems", JSON.stringify({ code, language, problemId }));
        //store in db
        console.log("data sent in 'problems' queue")
        res.status(200).send("Submission received in queue and stored");
    } catch (error) {
        console.error("Redis error ", error);
        res.status(500).send("Failed to store submissions");
    }
})


async function startServer() {
    try {
        //connect client
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        });
    } catch (error) {
        console.log("Failed to connect to Redis ", error);
    }
}

startServer();