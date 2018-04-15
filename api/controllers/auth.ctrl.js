const AuthModule = require('../config/AuthModule');
const TokenService = require('../config/TokenService');

module.exports = {
    facebookAuth,
    retrieveUser,
    generateToken    
};

function facebookAuth(req, res, next) {
    const options = {
        code: req.body.code,
        clientId: req.body.clientId,
        redirectUri: req.body.redirectUri        
    };

    AuthModule.facebookAuthentication(options, (err, response) => {
        if(err) return res.status(401).json({err: 'Error during facebook oauth'});

        req.authObject = response;

        next();
    });
}

function retrieveUser(req, res, next) {    
    if(!req.authObject) return res.status(401).json({err: 'Error while fetching user'});

    const userToRetrieve = {
        user: req.authObject.user,
        type: req.authObject.type
    };

    AuthModule.createOrRetrieveUser(userToRetrieve, (err, user) => {
        if(err || !user) return res.status(401).json({err: 'Error while fetching user'});

        req.user = user;

        next();        
    })
}

function generateToken(req, res, next){
    TokenService.createToken({user: req.user}, (err, token) => {
        if(err) return next({status: 401, err: 'User Validation failed'});

        req.generateToken = token;

        next();
    });
}