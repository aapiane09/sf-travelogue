// controllers/placesController.js
var db = require('../models');

//GET /api/neighborhoods/hoodId/places
// get all places from a neighborhood
function index(req, res) {
  var hoodId = req.params.hoodId;

  db.Neighborhood.findOne({_id: hoodId}, function(err, foundNeighborhood){
    res.json(foundNeighborhood.places);
  });
}

// POST /api/neighborhoods/:hoodId/places
// creates a new place in a neighborhood
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
//get one specific place from a neighborhood as JSON
function show(req, res) {
  var hoodId = req.params.hoodId;
  var placeId = req.params.placeId;

  db.Neighborhood.findOne({_id: hoodId}, function(err, foundNeighborhood){
    var foundPlace = foundNeighborhood.places.id(placeId);

    res.json(foundPlace);
  });
}


// PUT or PATCH /api/neighborhoods/:hoodId/places/:placeId
// find one place by id, update it based on request body,
// and send it back as JSON
function update(req, res) {
  var placeId = req.params.placeId;

  db.Neighborhood.findOne({_id: req.params.hoodId}, function(err, foundNeighborhood){
    if(err){
      res.status(500).send('database error');
    }else{
      var foundPlace = foundNeighborhood.places.id(placeId);
      foundPlace.name = req.body.name || foundPlace.name;
      foundPlace.address = req.body.address || foundPlace.address;
      foundPlace.category = req.body.category || foundPlace.category;
      foundPlace.goodStuff = req.body.goodStuff || foundPlace.goodStuff;
      foundPlace.openingHour = req.body.openingHour || foundPlace.openingHour;
      foundPlace.closingHour = req.body.closingHour || foundPlace.closingHour;

      foundPlace.save(function(err, savedPlace){
        if(err){
          res.status(500).send('database error');
        }else{
          res.json(foundPlace);
        }
      });
    }
  });
}

// DELETE /api/neighborhoods/:hoodId/places/:placeId
// find one place by id, delete it, and send it back as JSON
function destroy(req, res) {
  var hoodId = req.params.hoodId;
  var placeId = req.params.placeId;

  db.Neighborhood.findOne({_id: hoodId}, function(err, foundNeighborhood){
    if(err){
      res.status(500).send('database error');
    }else{
      var foundPlace = foundNeighborhood.places.id(placeId);
      foundPlace.remove();
      foundNeighborhood.save(function(err, savedNeighborhood){
        res.json(foundPlace);
      });
    }
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}
