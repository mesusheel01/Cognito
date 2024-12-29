"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkValidator = exports.tagValidator = exports.contentValidator = exports.signinValidator = exports.signupValidator = void 0;
const zod_1 = require("zod");
// User signup validator
const signupValidator = zod_1.z.object({
    username: zod_1.z.string()
        .min(6, { message: "Username should be at least 6 characters!" })
        .max(11, { message: "Username should be at most 11 characters!" })
        .regex(/[A-Z]/, { message: "Username must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Username must contain at least 1 numeric character!" }),
    password: zod_1.z.string()
        .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Password must contain at least 1 numeric character!" })
});
exports.signupValidator = signupValidator;
const signinValidator = zod_1.z.object({
    username: zod_1.z.string()
        .min(6, { message: "Username should be at least 6 characters!" })
        .max(11, { message: "Username should be at most 11 characters!" })
        .regex(/[A-Z]/, { message: "Username must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Username must contain at least 1 numeric character!" }),
    password: zod_1.z.string()
        .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter!" })
        .regex(/\d/, { message: "Password must contain at least 1 numeric character!" })
});
exports.signinValidator = signinValidator;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
// contentValidator
const contentValidator = zod_1.z.object({
    link: zod_1.z.string().url(),
    type: zod_1.z.enum(['image', 'video', 'article', 'audio']),
    title: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
});
exports.contentValidator = contentValidator;
// now i have to  create a tagValidator so i just can use pick from then typescript api to pick a type from the contentValidator field
// we directly cannot use Pick in zod but it provides .pick() method to create a new type from an existing ones same as Pick.
const tagValidator = contentValidator.pick({
    tags: true
});
exports.tagValidator = tagValidator;
// linkValidator
const linkValidator = zod_1.z.object({
    hash: zod_1.z.string(),
    userId: zod_1.z.string()
});
exports.linkValidator = linkValidator;
