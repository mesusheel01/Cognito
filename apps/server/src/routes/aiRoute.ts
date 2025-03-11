import { Router } from "express";
import { userMiddleware } from "../controller/userController";
import OpenAI from "openai";


const openAiRouter = Router()

openAiRouter.use(userMiddleware as any)

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


openAiRouter.post('/', async(req,res)=>{
    const content = req.body.content
    const searchQuery = req.body.searchQuery
    try {
        const response = await client.responses.create({
            model:'gpt-4o',
            instructions: "You are provided with a url, doc, or twitter related thing act as a genuis and give the best and short output for the input}",
            input: `${content} ${searchQuery} `
        })
        res.json({
            output: response
        })
    } catch (error) {
        res.json({
            message:"error" + error
        })
    }
})
