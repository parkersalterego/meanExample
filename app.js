const express = require('express'),
      mongoose = require('mongoose'),
      logger = require('morgan'),
      bcrypt = require('bcryptjs'),
      passport = require('passport'),
      bodyParser = require('body-parser'),
      path = require('path'),
      cors = require('cors'),
      fs = require('fs'),
      app = express();

 let env = require('dotenv').config(); 
 env;

app.set('env', process.env.NODE_ENV || 'development');
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 8080);

// routes 

app.use(logger('common', {
      stream: fs.createWriteStream('./access.log', {
            flag: 'a'
      })
}));
app.use(logger('dev')); 

// cors middleware
app.use(cors());

// body parser middleware 
app.use(bodyParser());

// static folder 
app.use(express.static(path.join(__dirname, 'public')));

// db conncection
// mongoose.connect(process.env.DATABASE);

// mongoose.connection.on('connected', (req, res, next) => {
//       console.log('Connected to database ' + process.env.DATABASE);
// });

// mongoose.connection.on('error', (err, next) => {
//       console.log('Error connecting to database ' + err);
//       next(err);
// });

// set route prefixes 

// index route 
app.get('/', (req, res, next) => {
      res.send('Connected to server please use /api');
});


// catch 404 
app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
});

// dev error handler
// prints stack trace
if (app.get('env') === 'development') {
      app.use((err, req, res, next) => {
            res.status(err.code || 500)
                  .json({
                        status: 'error',
                        message: err
                  });
      });
}

// prod error handler 
// does not print stack trace
app.use((err, req, res, next) => {
            res.status(err.code || 500)
                  .json({
                        status: 'error',
                        message: err.message
                  });
      });

// start server
app.listen(app.get('port'), () => {
    console.log('\n' + '***********************************');
    console.log('* REST API listening on port ' + app.get('port') + ' *');
    console.log('***********************************' + '\n');
});

module.exports = app;
