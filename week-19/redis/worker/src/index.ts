import { resolve } from "path";
import { createClient } from "redis";

const client = createClient();
client.on('error', (err) => console.log("Redis client error ", err));

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing data for  problemId : ${problemId}....`);
    console.log(`Code : ${code}`);
    console.log(`Language : ${language}`);

    // Here you would add your actual processing logic

    // Simulate processing delay of 2 sec
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`Finished processing submission for problemId :  ${problemId}.`);
    console.log('\n- - - - - - - - - - - - - - - - ');
}

async function startWorker() {
    try {
        await client.connect();
        console.log("Worker is connected to Redis.");

        //main loop - keep run infinitely and poll queue
        while (true) {
            try {
                //blocking queue, where the code will wait until a new element is pushed to the list before proceeding.
                const submission = await client.brPop("problems", 0)

                //@ts-ignore
                await processSubmission(submission.element)
            } catch (error) {
                console.log("Error processing submissions : ", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();