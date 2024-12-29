import mongoose from 'mongoose';
import { z } from 'zod';

// User signup validator
const signupValidator = z.object({
    username: z.string()
        .min(6, { message: "Username should be at least 6 characters!" })
        .max(11, { message: "Username should be at most 11 characters!" })
        .regex(/[A-Z]/, { message: "Username must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Username must contain at least 1 numeric character!" }),

    password: z.string()
        .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Password must contain at least 1 numeric character!" })
});

const signinValidator = z.object({
    username: z.string()
        .min(6, { message: "Username should be at least 6 characters!" })
        .max(11, { message: "Username should be at most 11 characters!" })
        .regex(/[A-Z]/, { message: "Username must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Username must contain at least 1 numeric character!" }),

    password: z.string()
        .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Password must contain at least 1 numeric character!" })
})

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
// contentValidator
const contentValidator = z.object({
    link: z.string().url(),
    type: z.enum(['image', 'video', 'article', 'audio']),
    title: z.string(),
    tags: z.array(z.string()),
})

// now i have to  create a tagValidator so i just can use pick from then typescript api to pick a type from the contentValidator field
// we directly cannot use Pick in zod but it provides .pick() method to create a new type from an existing ones same as Pick.
const tagValidator = contentValidator.pick({
    tags: true
})


// linkValidator

const linkValidator = z.object({
    hash: z.string(),
    userId : z.string()
})


export{
    signupValidator, signinValidator, contentValidator, tagValidator, linkValidator
}
