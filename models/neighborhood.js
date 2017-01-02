var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Place = require("./place.js");


var NeighborhoodSchema = new Schema({
  name: String,
  description: String,
  places: [Place.schema],
  imageUrl: String
});

var Neighborhood = mongoose.model('Neighborhood', NeighborhoodSchema);

module.exports = Neighborhood;
