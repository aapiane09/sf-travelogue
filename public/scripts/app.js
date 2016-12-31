//app.js
var indexTemplate;
var hoodTemplate;
var $hoodList;
var $indexList;
var allNeighborhoods = [];
var neighborhoodId;
var hoodSource;
$(document).ready(function(){
  console.log("DOM Ready!");

  //Form Option Select
  $('select').material_select();

  $indexList = $('#indexTarget');
  $hoodList = $('#neighborhoodTarget');

  var indexSource = $('#index-template').html();
  indexTemplate = Handlebars.compile(indexSource);


  hoodSource = $('#neighborhood-template').html();
  console.log(hoodSource, "this is hoodSource");
  hoodTemplate = Handlebars.compile(hoodSource);

  $.ajax({
    method: 'GET',
    url: '/api/neighborhoods',
    success: onSuccess,
    error: onError
  });



  $('#neighborhood').on('click','#neighborhood-id', function(e){
    console.log("picture clicked");
    neighborhoodId = $(this).data('neighborhood-id');
    $('#modal1').modal();
    render();
  });
});


function render(){
  console.log('render function');

  var neighborhoodHtml;
  allNeighborhoods.forEach(function(json){
    neighborhoodHtml = hoodTemplate({ neighborhood: json });
    if(json._id === neighborhoodId ){
    $hoodList.append(neighborhoodHtml);
  }
  });
  console.log(neighborhoodId, "this is hoodId");



  //Initialize add place modal
  $(".btn").click(function (){
    console.log("Button clicked!");
    $('#modal1').modal();
  });

  //Initialize edit place modal
  $("#edit_place").click(function(){
    console.log("Button clicked!");
    $('#modal2').modal();
  });

  //add place button
  $('.btn-flat').on('click', function(target){
    target.preventDefault();
      console.log('new place serialized', $(this).serialize());
      $.ajax({
        method: 'POST',
        url: 'api/neighborhoods/5861dd168781786b9038aabf/places',
        data: $(this).serialize(),
        success: newPlaceSuccess,
        error: newPlaceError
      });
  });
}


function renderIndex(){
  console.log('renderIndex function');

  var indexHtml;
  allNeighborhoods.forEach(function(json){
    indexHtml = indexTemplate({ neighborhood: json });
    $indexList.append(indexHtml);
  });

}

function onSuccess(json){
  allNeighborhoods = json;
  console.log("allNeighborhoods ", allNeighborhoods);
  renderIndex();
  render();
}

function onError(){
  $('#neighborhoodTarget').text('Failed to load neighborhoods, is the server running?');

}

function newPlaceSuccess(json){
  console.log("new place success")
  // $('#newPlaceForm input').val('');
  // allNeighborhoods.push(json);
  // console.log("new place created", json);
  // render();
}

function newPlaceError(){
  console.log('new place error!');
}
