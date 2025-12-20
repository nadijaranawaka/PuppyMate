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
                {role: "system", content: "You are an skilled Creative writing Author, with strong \
                     word control and ability to change your tone anytime.\
                     Be unique and modern.You are to generate a powerful \
                     and relatable quotes for each scenario a users wants, \
                     You are given a `description`,a `tone`, a `point of view`, `up to 3 emotions` the user selected and `a word count` \
                     You are to generate those codes as a helpful Author \
                     Give only the output as one big string seperated with | for each output and do not number them. as follows\
                     "},
                {role: "user",content:"Generate 10 quotes which recalls the following: \
                    Description: chasing dreams against all odds\
                    Tone: insipirational\
                    Point of view: first person\
                    Emotions: hope,determination,courage\
                    quote length: medium"},
                {role:"assistant",content:"Every morning I rise with fire in my chest, chasing dreams no matter how impossible they seem.|Fear whispers doubts, but I push forward, knowing my courage will carve a path through the storm.|I embrace every failure as fuel, each setback a step closer to the life I dare to imagine.|Hope guides me when shadows loom, reminding me that even small strides can spark monumental change.|I fight against the current of uncertainty, my determination stronger than the obstacles ahead.|Every challenge becomes a teacher, every struggle a story of resilience written in my own hands.|I hold my dreams tightly, letting neither doubt nor fear steal their brilliance from my grasp.|With heart unyielding, I leap over limits, proving that courage is the heartbeat of achievement.|I breathe ambition into every step, knowing persistence transforms impossibility into reality.|Even when the night is darkest, I chase the dawn, my spirit ignited by hope, courage, and relentless will."},
                {role: "user", content: `Generate 10 quotes which recalls the following: \
                    Description: ${input_dict.description} \
                    Tone: ${input_dict.tone} \
                    Point of view : ${input_dict.pov} \
                    emotions: ${input_dict.emotions} \
                    quote length: ${input_dict.length}`
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
