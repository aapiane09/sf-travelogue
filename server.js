//require modules
var express = require('express'),
    bodyParser = require('body-parser'),
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
  res.send("The server is up and running");
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to SF-Travelogue API! Here's what you need to know!",
    documentationUrl: "https://github.com/aapiane09/sf-travelogue/blob/master/README.md",
    baseUrl: "http://sf-travelogue.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/neighborhoods", description: "get all neighborhoods as JSON"},
      {method: "GET", path: "/api/neighborhoods/:hoodId", description: " get one specific neighborhood as JSON"},
      {method: "GET", path: "/api/neighborhoods/:hoodId/place/:placeId", description: "get one specific place from a neighborhood as JSON"},
      {method: "POST", path: "/api/neighborhoods/:hoodId/place", description: "create a new place for a neighborhood"},
      {method: "PUT", path: "/api/neighborhoods/:hoodId/place/:placeId", description: "Updates one place atributes"},
      {method: "PATCH", path: "/api/neighborhoods/:hoodId/place/:placeId", description: "Updates one place atributes"},
      {method: "DELETE", path: "/api/neighborhoods/:hoodId/place/:placeId", description: "Deletes one specific place from a neighborhood"}
    ]
  });
});

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
