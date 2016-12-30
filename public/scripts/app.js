//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
var neighborhoodId;


$(document).ready(function(){
  console.log("DOM Ready!");

  //Initialize Slider
  $('.carousel.carousel-slider').carousel({full_width: true});

  //Form Option Select
  $('select').material_select();

  $neighborhoodsList = $('#neighborhoodTarget');

  var source = $('#neighborhood-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/neighborhoods',
    success: onSuccess,
    error: onError
  });
});


function render(data){
  console.log('render function');

  var neighborhoodHtml;
  allNeighborhoods.forEach(function(json){
    if (json._id === '5862d0569396db5486b1eff1') {
    neighborhoodHtml = template({ neighborhood: json });
    if(json._id === "5861dd168781786b9038aabf" ){
    $neighborhoodsList.append(neighborhoodHtml);
  }

  });

  $('#neighborhood').on('click','#neighborhood-id', function(e){
    neighborhoodId = $(this).data('neighborhood-id');
    console.log(neighborhoodId);
  });

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
        url: 'api/neighborhoods/' + neighborhoodId + '/places',
        data: $(this).serialize(),
        success: newPlaceSuccess,
        error: newPlaceError
      });
  });
}

function onSuccess(json){
  allNeighborhoods = json;
  console.log("allNeighborhoods ", allNeighborhoods);
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
