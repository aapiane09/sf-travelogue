var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  address: String,
  category: String,
  goodStuff: String,
  openingHour: String,
  closingHour: String,
  isOpen: Boolean,
  imageUrl: String
});

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
