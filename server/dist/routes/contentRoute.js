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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const db_1 = require("../db");
const inputValidator_1 = require("../inputValidator");
const contentRouter = (0, express_1.Router)();
// Apply user middleware for all routes
contentRouter.use(userController_1.userMiddleware);
// Create content
contentRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToValidate = req.body;
    const { success, error } = inputValidator_1.contentValidator.safeParse(bodyToValidate);
    if (!success) {
        res.status(400).json({
            msg: "Provide a valid input body!",
            error: (error === null || error === void 0 ? void 0 : error.issues) || "Validation failed",
        });
        return;
    }
    const { link, type, title, tags } = bodyToValidate;
    const CurrUserId = req.userId;
    try {
        const existingContent = yield db_1.Content.findOne({ title });
        if (existingContent) {
            res.status(409).json({
                msg: "Content with the provided title already exists!",
            });
            return;
        }
        //fetch tags object id
        const tagIds = yield Promise.all(tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let existingTag = yield db_1.Tag.findOne({ title: tag });
            if (!existingTag) {
                existingTag = yield db_1.Tag.create({ title: tag });
            }
            return existingTag._id;
        })));
        const newContent = yield db_1.Content.create({
            link,
            type,
            title,
            tags: tagIds,
            userId: CurrUserId,
        });
        res.status(201).json({
            msg: "New content created successfully!",
            newContent,
        });
        console.log(`Content created by user : ${CurrUserId} and content is : ${newContent}`);
    }
    catch (error) {
        res.status(500).json({
            msg: "Server error!",
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
}));
//get by particular id
contentRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const contents = yield db_1.Content.findById({ id });
        if (!contents) {
            res.status(404).json({
                msg: "No content available for the user!",
            });
            return;
        }
        res.status(200).json({ contents });
    }
    catch (err) {
        res.status(500).json({
            msg: "Server error!",
        });
    }
}));
// Get all the user's posted content
contentRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const contents = yield db_1.Content.find({ userId });
        if (!contents || contents.length === 0) {
            res.status(404).json({
                msg: "No content available for the user!",
            });
            return;
        }
        res.status(200).json({ contents });
    }
    catch (err) {
        res.status(500).json({
            msg: "Server error!",
        });
    }
}));
// Delete content
contentRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedContent = yield db_1.Content.findByIdAndDelete(id);
        if (!deletedContent) {
            res.status(404).json({
                msg: "Content not found!",
            });
            return;
        }
        res.status(202).json({
            msg: "Content deleted successfully!",
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Server error!",
        });
        return;
    }
}));
exports.default = contentRouter;
