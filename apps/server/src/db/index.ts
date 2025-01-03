import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to DB!");
    } catch (err) {
        console.error("Connection error:", err);
    }
}
connectDB();

// Constants
const contentTypes = ['image', 'video', 'article', 'audio'] as const;
const objectId = mongoose.Types.ObjectId;

// User Schema
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Content Schema
const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: objectId, ref: 'Tag' }],
    userId: { type: objectId, ref: 'User', required: true }
}, { timestamps: true });

// Tag Schema
const tagSchema = new Schema({
    title: { type: String, unique: true, required: true }
}, { timestamps: true });

// Link Schema
const linkSchema = new Schema({
    hash: { type: String, unique: true, required: true },
    userId: { type: objectId, ref: 'User', required: true }
}, { timestamps: true });

// Pre-save hook to enforce user validation (optional)
linkSchema.pre('save', async function(next) {
    const user = await mongoose.model('User').findById(this.userId);
    if (!user) {
        throw new Error('User does not exist');
    }
    next();
});

// Models
const User = mongoose.model('User', userSchema);
const Content = mongoose.model('Content', contentSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Link = mongoose.model('Link', linkSchema);

export { User, Content, Tag, Link };
