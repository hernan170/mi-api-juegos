import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import User from '../models/User.js';

export const initGithubStrategy = () => {
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID || 'GITHUB_CLIENT_ID_DUMMY',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || 'GITHUB_CLIENT_SECRET_DUMMY',
        callbackURL: 'http://localhost:8080/api/v1/auth/github/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json?.email || `${profile.username}@github.com`;

            let user = await User.findOne({ email });

            if (!user) {
                user = await User.create({
                    first_name: profile._json?.name || profile.username,
                    last_name: 'GitHubUser',
                    email: email,
                    password: 'OAUTH_EXTERNAL_USER', 
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};