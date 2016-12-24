// controllers/placesController.js
var db = require('../models');

//GET /api/neighborhoods/hoodId/places
function index(req, res) {
// get all places from a neighborhood
  var hoodId = req.params.hoodId;

  db.Neighborhood.findOne({_id: hoodId}, function(err, foundNeighborhood){
    res.json(foundNeighborhood.places);
  });
}

// POST /api/neighborhoods/:hoodId/places
function create(req, res) {
  var hoodId = req.params.hoodId;
  var newPlace = new db.Place(req.body);

  db.Neighborhood.findOne({_id: hoodId}, function(err, foundNeighborhood){
    foundNeighborhood.places.push(newPlace);
    foundNeighborhood.save(function(err, savedNeighborhood){
      res.json(newPlace);
    });
  });
}

// GET /api/neighborhoods/hoodId/places/:placeId
function show(req, res) {
//get one specific place from a neighborhood as JSON
var hoodId = req.params.hoodId;
var placeId = req.params.placeId;
  db.Neighborhood.findOne({_id: hoodId}, function(err, foundNeighborhood){
    var foundPlace = foundNeighborhood.places.id(placeId);
      res.json(foundPlace);
  });
}


// DELETE /api/neighborhoods/:hoodId/places/:placeId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/neighborhoods/:hoodId/places/:placeId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
}
