// controllers/placesController.js
var db = require('../models');

//GET /api/neighborhoods/hoodId/places
function index(req, res) {
// get all places from a neighborhood
}

// POST /api/neighborhoods/:hoodId/places
function create(req, res) {

}

// GET /api/neighborhoods/hoodId/places/:placeId
function show(req, res) {
//get one specific place from a neighborhood as JSON
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
