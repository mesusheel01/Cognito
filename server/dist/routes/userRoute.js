"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inputValidator_1 = require("../inputValidator");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToValidate = req.body;
    const { success } = inputValidator_1.signupValidator.safeParse(bodyToValidate);
    if (!success) {
        res.status(400).json({
            msg: "Provide right inputs!"
        });
        return;
    }
    const { username, password } = bodyToValidate;
    try {
        const existingUser = yield db_1.User.findOne({ username });
        if (existingUser) {
            res.status(409).json({
                msg: "User exists with same username! "
            });
            return;
        }
        const saltRounds = 8;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = yield db_1.User.create({
            username,
            password: hashedPassword
        });
        const token = jsonwebtoken_1.default.sign({ username, userId: newUser._id }, __1.jwt_pass);
        res.status(201).json({
            msg: "User created with provided credentials!",
            token
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Server Error",
            error: err instanceof Error ? err.message : 'Unknown error!'
        });
    }
}));
// signin for user
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToValidate = req.body;
    const { success } = inputValidator_1.signinValidator.safeParse(bodyToValidate);
    if (!success) {
        res.status(400).json({
            msg: "Provide right inputs!"
        });
        return;
    }
    const { username, password } = bodyToValidate;
    try {
        const existingUser = yield db_1.User.findOne({ username });
        if (!existingUser) {
            res.status(409).json({
                msg: "User does not exist! "
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ username, userId: existingUser._id }, __1.jwt_pass, { expiresIn: '1h' });
        res.status(201).json({
            msg: "User signed in successfully!",
            token
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Server Error",
            error: err instanceof Error ? err.message : 'Unknown error!'
        });
    }
}));
exports.default = userRouter;
