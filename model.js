import express from "express"
import dotenv from "dotenv"
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

import ModelClient,{isUnexpected} from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

app.post("/generate", async(req, res) => {
    try{
        const input_dict = req.body;

    const client = ModelClient(
        endpoint,
        new AzureKeyCredential(token)
    );

    const response = await client.path("chat/completions").post({
        body : {
            messages: [
                {role: "system", content: "You are an famous Creative writing Author, with strong \
                     word control and ability to change your tone anytime.`Do not sound so pain be unique and modern` \
                      You are to generate a powerful \
                     and relatable quotes for each scenario a users wants, You are given a `description`,\
                     a `tone`, a `point of view`, `up to 3 emotions` the user selected and `a word count` \
                     You are to generate those codes as a helpful Author \
                     Give only the output as one big string seperated with for each output and do not number them. as follows\
                     ```\
                     <output1>|<output2>|....|<output10>```\
                     Do not add | at the end of the whole output"},
                {role: "user", content: `Generate 10 quotes which recalls the following: \
                    Description: ${input_dict.description} \
                    Tone: ${input_dict.tone} \
                    Point of view : ${input_dict.pov} \
                    emotions: ${input_dict.emotions} \
                    word count: ${input_dict.length}`
                }
            ],
            model: model
        }
    });

    if (isUnexpected(response)){
        throw response.body.error
    }

    res.json({output: response.body.choices[0].message.content}); 
    } catch (err) {
    console.error("Error Found: ",err);
    res.status(500).json({error: err.toString() });    
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"))
