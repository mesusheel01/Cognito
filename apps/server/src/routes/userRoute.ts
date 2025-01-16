import { Router } from "express"
import { signinValidator, signupValidator } from "../inputValidator"
import { User } from "../db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_pass } from ".."

const userRouter = Router()


userRouter.post("/signup" , async (req,res)=>{
    const bodyToValidate = req.body
    const {success} = signupValidator.safeParse(bodyToValidate)
    if(!success){
        res.status(400).json({
            msg: "Provide right inputs!"
        })
        return
    }
    const {username, password} =  bodyToValidate
    try{
        const existingUser = await User.findOne({username})
        if(existingUser){
        res.status(409).json({
                msg: "User exists with same username! "
            })
            return
        }
        const saltRounds = 8
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            username,
            password: hashedPassword
        })
        const token = jwt.sign({username, userId: newUser._id}, jwt_pass as string)
        res.status(201).json({
            msg: "User created with provided credentials!",
            token
        })
    }catch(err){
        res.status(500).json({
            msg: "Server Error",
            error: err instanceof Error ? err.message: 'Unknown error!'
        })
    }
})

// signin for user
userRouter.post("/signin" , async(req,res)=>{
    const bodyToValidate = req.body
    const {success} = signinValidator.safeParse(bodyToValidate)
    if(!success){
         res.status(400).json({
            msg: "Provide right inputs!"
        })
        return
    }
    const {username, password} =  bodyToValidate
    try{
        const existingUser = await User.findOne({username})
        if(!existingUser){
            res.status(409).json({
                msg: "User does not exist! "
            })
            return
        }
        const token = jwt.sign({username, userId: existingUser._id}, jwt_pass as string, {expiresIn:'1h'})
        res.status(201).json({
            msg: "User signed in successfully!",
            token
        })
    }catch(err){
        res.status(500).json({
            msg: "Server Error",
            error: err instanceof Error ? err.message: 'Unknown error!'
        })
    }
})


export default userRouter
