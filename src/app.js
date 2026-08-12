import express from 'express';
import cors from 'cors';
import compression from 'express-compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

// 1. Local se importa directo
import './strategies/local.js'; 

// 2. GitHub se importa como función
import { initGithubStrategy } from './strategies/github.js';

import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression({
    brotli: { enabled: true },
    threshold: 1024
}));

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 3600
    }),
    secret: process.env.SESSION_SECRET || 'coderSecret2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 3600000
    }
}));


app.use(passport.initialize());
app.use(passport.session());


initGithubStrategy();


app.use('/api/v1/auth', authRoutes);              
app.use('/api/v1', protectedRoutes);

export default app;