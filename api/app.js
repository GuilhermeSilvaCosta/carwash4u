var express = require('express');
var path = require('path');
var logger = require('morgan');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const cors = require('cors');
var routes = require('./routes/index');
const mongoose = require('mongoose');

dotenv.load({ path: '.env' });

const TokenService = require('./config/TokenService');
const authCtrl = require('./controllers/auth.ctrl');

var app = express();

mongoose.connect(process.env.MONGODB_URI,{ useMongoClient: true });
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error.'+process.env.MONGODB_URI);
    process.exit(1);
});

const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(cors({
  origin: '*',
  withCredentials: false,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const token = new TokenService(req.headers);

  req.isAuthenticated = token.isAuthenticated;
  req.tokenPayload = token.getPayload();
  req.user = {
      _id: req.tokenPayload._id
  };

  next();
});

app.use(express.static(path.join(__dirname, '/public')));

//app.use('/', routes);

app.post('/auth/facebook',
        () => {console.log('aki então')},
        authCtrl.facebookAuth,
        authCtrl.retrieveUser,
        authCtrl.generateToken,
        (req, res) => {
            res.json({ token: req.generatedTokenn });
        }
);

app.listen(port, function(){
  console.log('Carwash4U rodando na porta ' + port);
});

module.exports = app;