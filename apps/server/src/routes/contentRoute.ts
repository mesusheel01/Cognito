import { Router } from "express";
import { userMiddleware } from "../controller/userController";
import { Content, Tag } from "../db";
import { contentValidator } from "../inputValidator";

const contentRouter = Router();

// Apply user middleware for all routes

contentRouter.use(userMiddleware as any);

// Create content
contentRouter.post("/", async (req, res) => {
    const bodyToValidate = req.body;
    const { success, error } = contentValidator.safeParse(bodyToValidate);

    if (!success) {
        res.status(400).json({
            msg: "Provide a valid input body!",
            error: error?.issues || "Validation failed",
        });
        return
    }

    const { link, type, title, tags } = bodyToValidate;
    const CurrUserId = req.userId;

    try {
        const existingContent = await Content.findOne({ title });
        if (existingContent) {
            res.status(409).json({
                msg: "Content with the provided title already exists!",
            });
            return
        }
        //fetch tags object id
        const tagIds = await Promise.all(
            tags.map(async (tag:string) =>{
                let existingTag = await Tag.findOne({title:tag});
                if(!existingTag){
                    existingTag = await Tag.create({title:tag})
                }
                return existingTag._id;
            })
        )
        const newContent = await Content.create({
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
        console.log(`Content created by user : ${CurrUserId} and content is : ${newContent}`)
    } catch (error) {
        res.status(500).json({
            msg: "Server error!",
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return
    }
});

//get by particular id
contentRouter.get("/:id", async (req, res) => {

    const id = req.params.id
    
    try {
        const content = await Content.findById( id );


        if (!content) {
            res.status(404).json({
                msg: "No content available for the user!",
            });
            return
        }

        res.status(200).json({ content });
    } catch (err) {
        res.status(500).json({
            msg: "Server error!",
        });
    }
});

// Get all the user's posted content
contentRouter.get("/", async (req, res) => {
    const userId = req.userId;

    try {
        const contents = await Content.find({ userId });

        if (!contents || contents.length === 0) {
            res.status(404).json({
                msg: "No content available for the user!",
            });
            return
        }

        res.status(200).json({ contents });
    } catch (err) {
        res.status(500).json({
            msg: "Server error!",
        });
    }
});

// Delete content
contentRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContent = await Content.findByIdAndDelete(id);

        if (!deletedContent) {
            res.status(404).json({
                msg: "Content not found!",
            });
            return
        }

        res.status(202).json({
            msg: "Content deleted successfully!",
        });
    } catch (err) {
        res.status(500).json({
            msg: "Server error!",
        });
        return
    }
});

export default contentRouter;
