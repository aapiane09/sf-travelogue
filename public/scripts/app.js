//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
var neighborhoodId;
var placeId;
var $placeList;
var placeTemplate;

$(document).ready(function(){
  console.log("DOM Ready!");

  //Form Option Select
  $('select').material_select();

  //Neighborhoods Handlebars Template
  $neighborhoodsList = $('#neighborhoodTarget');
  var source = $('#neighborhood-template').html();
  template = Handlebars.compile(source);

  //Places Handlebars Template
  var source = $('#place-template').html();
  placeTemplate = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/neighborhoods',
    success: onSuccess,
    error: onError
  });
});


function render(){
  console.log('render function');
  var neighborhoodHtml;
  var placeHtml;
  allNeighborhoods.forEach(function(json){
    neighborhoodHtml = template({ neighborhood: json });
    $neighborhoodsList.append(neighborhoodHtml);
  });

  $('#neighborhoodTarget').on('click','.neighborhood-id', function(e){
    neighborhoodId = $(this).data('neighborhood-id');
    console.log("neighborhoodId: ", neighborhoodId);

    $('#neighborhoodTarget').empty();
    allNeighborhoods.forEach(function(json){
      neighborhoodHtml = template({ neighborhood: json });
      placeHtml = placeTemplate({neighborhood: json});
      if(json._id === neighborhoodId ){
        $neighborhoodsList.append(neighborhoodHtml);
        $neighborhoodsList.append(placeHtml);
      }

  });

  $('#neighborhoodTarget').off('click', '.neighborhood-id');
  console.log("after forEach");
    testFuc();

  });
  console.log("after click");




}

function fetchAndRenderPlaceWithId(placeId){
  var newPlaceHtml = placeTemplate({neighborhood: })
}


function testFuc(){
  console.log("testFuc")

  //when the add place button is clicked, display the modal
  $("#openPlaceModal").click(function (){
    console.log("Button open place modal clicked!");
    var currentNeighborhoodId = $(this).closest('.Neighborhood').data('neighborhood-id');
    $('#modal1').data('album-id', currentNeighborhoodId);
    $('#modal1').modal();//display the modal!
  });

  //Initialize edit place modal
  $(".edit_place").click(function(){
    console.log("Button open edit_place clicked!");
    placeId = $(this).closest('.place-id').data('place-id');
    console.log(placeId)
    $('#modal2').modal();
  });
/*
$('#songModal').on('click', '#saveSong', function(el) {
    console.log('saveSong clicked!');
    var $modal = $('#songModal');
    var $modalAlbumId = modal.data('album-id');
    var $songNameField = $modal.find('#songName');
    var $trackNumberField = $modal.find('#trackNumber');
    console.log(modalAlbumId);

    $.ajax({
      method: 'POST',
      url: 'api/albums/:album_id/songs',
      data: modalAlbumId.val(),
      success: newSongSuccess,
      error: newSongError
    })
  });
});
*/
  //add place button
  $('#addPlace').on('click', function(target){
    target.preventDefault();
    var $modal1 = $('#modal1');
    var $placeNameField = $modal1.find('#place_name');

    var dataToPost = {
      name: $placeNameField.val()
    };

    var testId = $modal1.data(testId);

    $.ajax({
      method: 'POST',
      url: 'api/neighborhoods/' + neighborhoodId + '/places',
      data: dataToPost,
      success: newPlaceSuccess,
      error: newPlaceError
    });
  });

  $('#editPlace').on('click', function(target){
    target.preventDefault();
    console.log('this serialized', $(this).serialize());
    $.ajax({
      method: 'PUT',
      url: 'api/neighborhoods/'+neighborhoodId+'/places/'+placeId,
      data: $(this).serialize(),
      success: editPlaceSuccess,
      error: editPlaceError
    });
  });

}


//Mike's JS
  // $('#neighborhood').on('click', '#neighborhood-id', function(event){
  //   // $('.gifSelectionField2').empty();
  //   console.log('i still know what you clicked on! ', this.src);
  //   // var pickedGfHtml = templateGifChoice({ userChosenGif: this.src});
  //   // $(".selected-gif").append(pickedGifHtml);
  // })

  //Initialize add place modal


  //

function onSuccess(json){
  allNeighborhoods = json;
  console.log("allNeighborhoods ", allNeighborhoods);
  render();
}



function onError(){
  $('#neighborhoodTarget').text('Failed to load neighborhoods, is the server running?');

}

function newPlaceSuccess(data){
  console.log("new place success");
  console.log("this is data: ", data);

}

function newPlaceError(){
  console.log('new place error!');
}

function editPlaceSuccess(json){
  console.log("edit place success")
  $('#newPlaceForm input').val('');
  console.log('new place form hit')
  allNeighborhoods.push(json);
  console.log("place edited created", json);
}

function editPlaceError(){
  console.log("edit place error")

}
