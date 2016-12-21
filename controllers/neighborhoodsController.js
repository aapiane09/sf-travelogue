var db = require('../models');
// GET /api/neighborhoods
//get all neighborhoods
function neighborhoods_index(req, res) {
  res.json({
    message: "Welcome to SF-Travelogue API! Here's what you need to know!",
    documentationUrl: "https://github.com/aapiane09/sf-travelogue/blob/master/README.md",
    baseUrl: "http://sf-travelogue.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/neighborhoods", description: "get all neighborhoods as JSON"},
      {method: "GET", path: "/api/neighborhoods/:hoodId", description: " get one specific neighborhood as JSON"},
      {method: "GET", path: "/api/neighborhoods/hoodId/places", description: "get all places from a neighborhood"},
      {method: "GET", path: "/api/neighborhoods/:hoodId/places/:placeId", description: "get one specific place from a neighborhood as JSON"},
      {method: "POST", path: "/api/neighborhoods/:hoodId/places", description: "create a new place for a neighborhood"},
      {method: "PUT", path: "/api/neighborhoods/:hoodId/places/:placeId", description: "Updates one place atributes"},
      {method: "PATCH", path: "/api/neighborhoods/:hoodId/places/:placeId", description: "Updates one place atributes"},
      {method: "DELETE", path: "/api/neighborhoods/:hoodId/places/:placeId", description: "Deletes one specific place from a neighborhood"}
    ]
  });
}

// GET /api/neighborhoods/:hoodId
//get one specific neighborhood
function neighborhoods_show(req, res) {

}

module.exports = {
  neighborhoods_index: neighborhoods_index,
  neighborhoods_show: neighborhoods_show
}
