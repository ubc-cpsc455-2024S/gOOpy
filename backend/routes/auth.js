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

    console.log(authorizeUrl);
    res.json({ url: authorizeUrl });
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
        saveUserInfo(tokens, userInfo.data);

        res.redirect('http://localhost:5173/');
    } catch (e) {
        console.error(error);
        res.status(500).send('authentication failed');
    }
});

const saveUserInfo = async (token, profile) => {
    console.log(token);
    console.log(profile);
    try {
        const user = await userModel.findOne({ oauth_id: profile.id });

        // TODO: consider encrypting tokens later
        if (user) {
            user.access_token = token.access_token;
            user.refresh_token = token.refresh_token;
            user.name = profile.name;
            user.profile_pic = profile.picture;
            await user.save();
        } else {
            const newUser = new userModel({
                oauth_id: profile.id,
                name: profile.name,
                description: '',
                profile_pic: profile.picture,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
            });
            await newUser.save();
        }
    } catch (e) {
        console.error('error saving user: ', e);
        throw e;
    }
};

module.exports = router;
