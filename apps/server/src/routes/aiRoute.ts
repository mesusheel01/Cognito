import { Router } from "express";
import { userMiddleware } from "../controller/userController";
import OpenAI from "openai";

const openAiRouter = Router();

// Correct way to use middleware
openAiRouter.use(userMiddleware as any);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

openAiRouter.post('/', async(req, res) => {
    const content = req.body.content;
    const searchQuery = req.body.searchQuery;

    try {
        const response = await client.chat.completions.create({  // Changed from responses to chat.completions
            model: 'gpt-4',  // Fixed model name from 'gpt-4o' to 'gpt-4'
            messages: [      // Changed from instructions/input to messages format
                {
                    role: "system",
                    content: "You are provided with a url, doc, or twitter related thing act as a genius and give the best and short output for the input"
                },
                {
                    role: "user",
                    content: `${content} ${searchQuery}`
                }
            ],
            max_tokens: 150  // Optional: limit response length
        });

        res.json({
            output: response.choices[0].message.content
        });
    } catch (error) {
        console.error('OpenAI API Error:', error);  // Added better error logging
        res.status(500).json({  // Added proper error status code
            message: "Error processing request",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default openAiRouter;  // Added export
