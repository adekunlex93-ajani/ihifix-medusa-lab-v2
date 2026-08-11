// server.js – OAuth 2.0 Express Server
const express = require('express');
const OAuthServer = require('@node-oauth/express-oauth-server');
const bodyParser = require('body-parser');

const app = express();

const oauth = new OAuthServer({
  model: require('./model'),
  grants: ['authorization_code'],
  accessTokenLifetime: 3600,
  refreshTokenLifetime: 14 * 24 * 60 * 60,
  allowEmptyState: false,
  allowExtendedTokenAttributes: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 1. Authorization Endpoint – get authorization code
app.all('/oauth/authorize', oauth.authorize({
  authenticateHandler: {
    handle: (req) => ({
      id: req.body?.userId || 1,
      name: req.body?.userId ? `User ${req.body.userId}` : 'admin',
    }),
  },
}));

// 2. Token Exchange Endpoint – exchange code for token
app.all('/oauth/token', oauth.token());

// 3. Protected Resource – requires valid access token
app.get('/api/profile', async (req, res) => {
  try {
    const token = await oauth.authenticate(req, res);
    return res.json({ user: token.user, issued_to: token.client.id });
  } catch (err) {
    return res.status(401).json({ error: 'unauthorized' });
  }
});

app.listen(3001, () => console.log('Auth server running on http://localhost:3001'));
