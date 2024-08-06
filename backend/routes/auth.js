var express = require('express');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
var router = express.Router();

const userModel = require('../models/user');

const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

router.get('/google', (req, res) => {
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        prompt: 'consent',
    });

    res.redirect(authorizeUrl);
});

router.get('/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        console.info('Token acquired.');

        req.session.tokens = tokens;

        const oauth2 = google.oauth2({
            auth: client,
            version: 'v2',
        });

        const userInfo = await oauth2.userinfo.get();
        const user = await saveUserInfo(tokens, userInfo.data);

        req.session.user = user;

        req.session.save((err) => {
            if (err) {
                console.error('Session save failed:', err);
                res.status(500).send('Session save failed');
            } else {
                res.redirect(`${process.env.WEBSITE_URL}/editor`);
            }
        });
    } catch (e) {
        console.error(e);

        // TODO: handle login failure
        res.redirect(`${process.env.WEBSITE_URL}`);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('failed to logout');
        }
        res.status(200).send('logout successful');
    });
});

router.get('/session-user', (req, res) => {
    console.log(req.session.id);
    req.session.reload(function (err) {
        if (req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.status(500).send('no user logged in');
        }
    });
});

// TODO: Delete during the TODO purge, put back later once project is done.
// TODO: middleware to be used later for save, will move to another file
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect(`${process.env.WEBSITE_URL}`);
    }
};

const saveUserInfo = async (token, profile) => {
    try {
        const user = await userModel.findOne({ oauth_id: profile.id });

        if (user) {
            return JSON.stringify(user);
        } else {
            const newUser = new userModel({
                oauth_id: profile.id,
                name: profile.name,
                description: '',
                profile_pic: profile.picture,
                scenes: [],
            });
            await newUser.save();
            return JSON.stringify(newUser);
        }
    } catch (e) {
        console.error('error saving user: ', e);
        throw e;
    }
};

module.exports = router;
