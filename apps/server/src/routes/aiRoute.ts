import  { Router } from 'express'
import { userMiddleware } from '../controller/userController'
import getAiResultFromContent from '../utils/contentAnalyzer.js'
import { Types } from 'mongoose'
import { Content } from '../db'

const aiRouter = Router()

aiRouter.use(userMiddleware as unknown as string)

// get the ai response router
aiRouter.post("/", async(req,res)=>{
    const {title, prompt} = req.body
    try {
        const response = await Content.findOne({ title })
        console.log(response)
        if(!response){
            res.send("No content with the given title")
            return
        }
        //@ts-ignore
        const aiResponse = await getAiResultFromContent(response.toObject(), prompt)
        res.json({
            message: aiResponse
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: error instanceof Error ? error.message : "An unknown error occurred"
        })
    }
})

// Define the Content interface
interface Content {
  link: string;
  type: string;
  title: string;
  tags: Types.ObjectId[]; // Assuming tags are an array of ObjectId references
  userId: Types.ObjectId; // Assuming userId is an ObjectId reference
  createdAt?: Date; // Optional, as it is typically added by Mongoose
  updatedAt?: Date; // Optional, as it is typically added by Mongoose
}

export default aiRouter
