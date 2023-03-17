import ENV from "dotenv"
import express from "express";
import { Configuration, OpenAIApi } from "openai";

ENV.config() // load secrets

const api = express();
const port = 3000;

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

// allow json to be read from the request
api.use(express.json());
// tell the app to render the files from the frontend folder
api.use(express.static("frontend"));

// a route that accepts post method
api.post("/search", async (request, response) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: request.body.userInput,
        temperature: 0.8,
        max_tokens: 100
    });

    console.log(completion.data);
    response.send(completion.data.choices[0]);
});

api.listen(port);
