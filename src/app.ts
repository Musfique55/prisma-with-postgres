import express from 'express'
import { PostRoutes } from './modules/posts/posts.routes';
import { CommentRoutes } from './modules/comments/comments.route';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";
import cors from 'cors';
import { UserRoutes } from './modules/users/user.routes';

const app = express();
app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
}))
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/',(req,res)=> {
    res.send("Hello World")
})

// posts
app.use('/posts',PostRoutes)
app.use('/comments',CommentRoutes)
app.use('/users',UserRoutes);

export default app;