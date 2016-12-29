//require modules
var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    controllers = require('./controllers'),
    app = express();
//parse incoming urlencoded form data and populate the req.body object
app.use(bodyParser.urlencoded({extended: true}));


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

 /**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  // res.send("The server is up and running");
  res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/neighborhoods/', function neighborhoods(req, res) {
  // res.send("The server is up and running");
  res.sendFile('./views/neighborhoods.html', {root: __dirname});
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);
app.get('/api/neighborhoods', controllers.neighborhoods.neighborhoods_index);
app.get('/api/neighborhoods/:hoodId', controllers.neighborhoods.neighborhoods_show);
app.get('/api/neighborhoods/:hoodId/places', controllers.places.index);
app.post('/api/neighborhoods/:hoodId/places', controllers.places.create);
app.get('/api/neighborhoods/:hoodId/places/:placeId', controllers.places.show);
app.put('/api/neighborhoods/:hoodId/places/:placeId', controllers.places.update);
app.delete('/api/neighborhoods/:hoodId/places/:placeId', controllers.places.destroy);


// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
