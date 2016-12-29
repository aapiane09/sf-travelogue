//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
$(document).ready(function(){
  console.log("DOM Ready!");

  $neighborhoodsList = $('#neighborhoodTarget');

  var source = $('#neighborhood-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/neighborhoods',
    success: onSuccess,
    error: onError
  })

//Initialize Slider
$('.carousel.carousel-slider').carousel({full_width: true});

//Initialize Form Modal
  $(".btn").click(function (){
    console.log("Button clicked!");
    $('#modal1').modal();
  })

//Form Option Select
  $('select').material_select();


//Modal footer add button

//   $('.modal-action').on('click', function(target){
//     target.preventDefault();
//       console.log('new place serialized', $(this).serializeArray());
//       $.ajax({
//         method: 'POST',
//         url: 'api/neighborhoods/:hoodId/places',
//         data: $(this).serializeArray(),
//         success: newPlaceSuccess,
//         error: newPlaceError
//       });
//   });
});


function render(){
  console.log('render function');
  var neighborhoodHtml;

  allNeighborhoods.forEach(function(json){
    neighborhoodHtml = template({ neighborhood: json});
    $neighborhoodsList.append(neighborhoodHtml);
  })
}

function onSuccess(json){
  allNeighborhoods = json;
  console.log("allNeighborhoods ", allNeighborhoods);
  render();
}

function onError(){
  $('#neighborhoodTarget').text('Failed to load neighborhoods, is the server running?');

}

// function newPlaceSuccess(json){
//   $('#newProjetForm input').val('');
//   allProjects.push(json);//what does this do?
//   console.log("new project created", json);
//   render();
// }
//
// function newPlaceError(){
//   console.log('new project error!');
// }
