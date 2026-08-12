import { Router } from 'express';
import passport from 'passport';
import { register, login } from '../controller/auth.js';
import {getSession, logout } from '../controller/auth.js';


const router = Router();

router.post('/register', register);
router.get('/session', getSession);
router.post('/logout', logout);

router.post('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ status: 'error', message: info?.message ||'error de autenticación' });

        req.user =user;
        login(req, res);
        
    })(req, res, next);
});

router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ status: 'error', message: 'Error de autenticación con GitHub' });

        }
        req.user = user;
        login(req, res);

    })(req, res, next);
})


export default router;
