import express, { Request, Response } from 'express';
import "dotenv/config";
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import { stripeWebHook } from './controllers/stripeWebHooks.js';

console.log("KEY LOADED:", process.env.AI_API_KEY);

const app = express();

app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebHook)
// Middleware
// app.use(cors())
app.use(express.json());
 
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,


}

app.use(cors(corsOptions))



// Mount Better Auth under /api/auth — mount the handler at the base path
// Use `app.use` so Express doesn't pass the wildcard string to path-to-regexp
app.use('/api/auth', toNodeHandler(auth));

app.use(express.json({limit : '50mb'}))

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/user',userRouter);
app.use('/api/project', projectRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});