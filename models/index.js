var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/sf-travelogue");

module.exports.Neighborhood = require("./neighborhood.js");
module.exports.Place = require("./place.js");
