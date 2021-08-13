var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 3000;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-ronin.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3000',
    issuer: 'https://dev-ronin.us.auth0.com/',
    algorithms: ['RS256']
});

// server.js

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});
  
  // This route needs authentication
app.get('/api/private', jwtCheck, function(req, res) {
    console.log(req.data);
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

app.listen(port, () => {
    console.log('server start PORT:', port);
})