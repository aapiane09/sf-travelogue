var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlacesSchema = new Schema({
  name: String,
  address: String,
  goodStuff: String
});

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
