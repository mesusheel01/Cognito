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
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require(".."); // Ensure this is correctly imported
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "Token is not set!" });
    }
    const actToken = token.split(" ")[1];
    if (!actToken) {
        return res.status(401).json({ msg: "Invalid token format!" });
    }
    jsonwebtoken_1.default.verify(actToken, __1.jwt_pass, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "Invalid or expired token!" });
        }
        if (user && user.userId) {
            req.userId = user.userId; // Attach userId to req
            next();
        }
        else {
            return res.status(400).json({ msg: "User data is missing in token!" });
        }
    });
});
exports.userMiddleware = userMiddleware;
