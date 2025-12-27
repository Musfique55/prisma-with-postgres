import express from 'express'
import { PostRoutes } from './modules/posts/posts.routes';

const app = express();

app.use(express.json());

app.get('/',(req,res)=> {
    res.send("Hello World")
})

// posts
app.use('/posts',PostRoutes)

export default app;