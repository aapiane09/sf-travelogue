//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
var neighborhoodId;
$(document).ready(function(){
  console.log("DOM Ready!");

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


function render(neighborhoodId){
  console.log('render function');
  console.log('allNeighborhoods', allNeighborhoods);
  var neighborhoodHtml;
  allNeighborhoods.forEach(function(json){
    neighborhoodHtml = template({ neighborhood: json });
    // if(json._id === neighborhoodId ){
    $neighborhoodsList.append(neighborhoodHtml);
  // }

  });

  $('#neighborhood').on('click','#neighborhood-id', function(e){
    neighborhoodId = $(this).data('neighborhood-id');
    console.log(neighborhoodId);
    $('#neighborhoodTarget').empty();
    allNeighborhoods.forEach(function(json){
      neighborhoodHtml = template({ neighborhood: json });
      console.log(neighborhoodHtml);
      if(json._id === neighborhoodId ){
      $neighborhoodsList.append(neighborhoodHtml);
    }
  })
});



//Mike's JS
  // $('#neighborhood').on('click', '#neighborhood-id', function(event){
  //   // $('.gifSelectionField2').empty();
  //   console.log('i still know what you clicked on! ', this.src);
  //   // var pickedGfHtml = templateGifChoice({ userChosenGif: this.src});
  //   // $(".selected-gif").append(pickedGifHtml);
  // })

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
