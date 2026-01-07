import express from 'express'
import userRouter from './routes/userRoute'
import contentRouter from './routes/contentRoute'
import dotenv from 'dotenv'
import cors from 'cors'
import aiRouter from './routes/aiRoute'
import credentailCheckStatus from './utils/credentialCheck.js'

dotenv.config()

const port = process.env.PORT
const app = express()
export const jwt_pass = process.env.JWT_SECRET

//to accept the req body
app.use(cors({
    origin: "https://cognitos.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Server is running!")
})
// api for user sign
app.use('/api/v1/user', userRouter)

//api for content
app.use('/api/v1/content', contentRouter)

app.use('/api/v1/ai-result', aiRouter)

//shareable link

//ai credential check
//@ts-ignore
app.get("/credential-check", async (req, res) => {
    const result = await credentailCheckStatus();
    res.send(result)
});

app.listen(port, () => {
    console.log(`Server is hosted on http://localhost:${port}`)
});
