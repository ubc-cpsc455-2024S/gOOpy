var express = require('express');
const { OAuth2Client } = require('google-auth-library');
var router = express.Router();

const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

router.get('/google', (req, res) => {
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
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
        console.log(req.session.tokens);

        res.redirect('http://localhost:5173/');
    } catch (e) {
        console.error(error);
        res.status(500).send('authentication failed');
    }
});

router.get('google/user', async (req, res) => {
    console.log(req.session.tokens);
    if (!req.session.tokens) return res.status(401).send('Unauthorized');

    client.setCredentials(req.session.tokens);
    const oauth2 = GoogleClient.oauth2({
        auth: client,
        version: 'v2',
    });
    const profile = await oauth2.userinfo.get();
    res.send(profile.data);
});

module.exports = router;
