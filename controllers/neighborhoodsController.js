var db = require('../models');

// GET /api/neighborhoods
//get all neighborhoods
function neighborhoods_index(req, res){
  console.log("neighborhoods_index function");
  db.Neighborhood.find({}, function(err, neighborhoods) {
      if(err){ return console.log("index error: " + err);}
    res.json(neighborhoods);
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
