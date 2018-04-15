'use strict';
const request = require('request');
const User = require('../models/User');

module.exports = {
    facebookAuthentication,
    createOrRetrieveUser
};

function facebookAuthentication(options, cb) {
    const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token'
    const graphApiUrl = `https://graph.facebook.com/v2.5/me?fields=${fields.join(',')}`;

    const params = {
        code: options.code,
        client_id: options.clientId,
        redirect_uri: options.redirectUri,
        client_secret: process.env.FACEBOOK_SECRET
    }

    request.get({url: accessTokenUrl, qs: params, json: true}, (err, response, accessToken) => {
        if(response.statusCode !== 200) return cb(accessToken.error.message);

        request.get({url: graphApiUrl, qs: accessToken, json: true}, (err, response, profile) => {
            if(response.statusCode !== 200) return cb(accessToken.error.message);

            const user = {
                profilePicture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
                firstName: profile.first_name,
                lastName: profile.last_name,
                profiles: {
                    facebook: profile.id
                },
                email: profile.email,
                token: accessToken
            };

            cb(null, {type:'facebook', user});            
        });
    });
}

function createOrRetrieveUser(options, cb){
    const query = {
        [`profiles.${options.type}`]: options.user.profiles[options.type]
    };
   
    User.findOne(query, (err, user) => {       
        if(err) return cb('Error fetching user');
        if(user) return cb(null, user);

        createUser(options.user, cb);
    });
}

function createUser(user, cb){    
    const newUser = new User(user);
    newUser.save(cb);
}