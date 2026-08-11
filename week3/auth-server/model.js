// model.js – In-memory OAuth 2.0 data model

const clients = [
  {
    id: 'osc-client',
    clientSecret: 'osc-secret-123',
    grants: ['authorization_code'],
    redirectUris: ['http://localhost:8888/callback'],
  },
];

const tokens = [];
const codes = [];

module.exports = {
  getClient: async (clientId, clientSecret) => {
    return clients.find(
      (c) => c.id === clientId && (!clientSecret || c.clientSecret === clientSecret)
    );
  },

  saveAuthorizationCode: async (code, client, user) => {
    const authCode = {
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      client: { id: client.id },
      user: user,
    };
    codes.push(authCode);
    return authCode;
  },

  getAuthorizationCode: async (authorizationCode) => {
    return codes.find((c) => c.authorizationCode === authorizationCode);
  },

  revokeAuthorizationCode: async (code) => {
    const index = codes.findIndex((c) => c.authorizationCode === code.authorizationCode);
    if (index !== -1) codes.splice(index, 1);
    return true;
  },

  saveToken: async (token, client, user) => {
    const accessToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: { id: client.id },
      user: user,
    };

    tokens.push(accessToken);

    // Debug message
    console.log("Saved token:", accessToken);

    return accessToken;
  },

  getAccessToken: async (accessToken) => {
    return tokens.find((t) => t.accessToken === accessToken);
  },

  getRefreshToken: async (refreshToken) => {
    return tokens.find((t) => t.refreshToken === refreshToken);
  },
};

