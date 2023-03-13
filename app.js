require("dotenv").config(); // load the secrets

const express = require("express");
const openai = require("openai");

const api = express();
const port = 3000;

const { Configuration, OpenAIApi } = openai;

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openAIApi = new OpenAIApi(config);

// allow json to be read from the request
api.use(express.json());
// tell the app to render the files from the frontend folder
api.use(express.static("frontend"));

api.post("/search", async (request, response) => {
    const completion = await openAIApi.createCompletion({
        model: "text-davinci-003",
        prompt: request.body.userInput,
        temperature: 0.6,
    });

    response.send(completion.data.choices[0]);
});

api.post("/suggestion", (request, response) => {});

api.listen(port);
