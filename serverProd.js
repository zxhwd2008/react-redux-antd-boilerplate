// set up ======================================================================
var express = require('express')
    ,app = express() 						// create our app w/ express
    ,port = process.env.PORT || 8080 				// set the port
    ,env = app.settings.env
    ,morgan = require('morgan')
    ,compression = require('compression');

// configuration ===============================================================

if (env === 'production') {

}else {
  app.use(morgan('dev')); // log every request to the console
}
app.use(compression());
app.use(express.static('./dist'));

// routes ======================================================================
// application -------------------------------------------------------------

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
