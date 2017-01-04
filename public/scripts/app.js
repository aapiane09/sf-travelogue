//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
var neighborhoodId;
var $placeList;
var placeTemplate;
var placeToUpdateId;
//var map;
$(document).ready(function(){
  console.log("DOM Ready!");
  //Reload Page
  $('#title').click(function(){
    location.reload();
  });
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

  $('#neighborhoodTarget').on('click','.neighborhood-id', function(e){
    neighborhoodId = $(this).data('neighborhood-id');
    console.log("neighborhoodId: ", neighborhoodId);
    $('#neighborhoodTarget').off('click', '.neighborhood-id');

    renderSpecificNeighborhood();

  });
});


function renderAllNeighborhoods(){
  console.log('renderSpecificNeighborhood function');
  var neighborhoodHtml;
  var placeHtml;
  allNeighborhoods.forEach(function(json){
    neighborhoodHtml = template({ neighborhood: json });
    $neighborhoodsList.append(neighborhoodHtml);
  });
}//renderAllNeighborhoods


function renderSpecificNeighborhood(){
  console.log("renderSpecificNeighborhood");
  // $('#neighborhoodTarget').on('click','.neighborhood-id', function(e){
  //   neighborhoodId = $(this).data('neighborhood-id');
  //   console.log("neighborhoodId: ", neighborhoodId);
  $('#neighborhoodTarget').empty();
  console.log(allNeighborhoods, "allNeighborhoods inside renderSpecificNeighborhood")
   allNeighborhoods.forEach(function(json){
    var neighborhoodHtml = template({ neighborhood: json });
    var placeHtml = placeTemplate({neighborhood: json});

    if(json._id === neighborhoodId ){
      $neighborhoodsList.append(neighborhoodHtml);
      $neighborhoodsList.append(placeHtml);

    }


  }); //forEach

  initializeCrud();
  // }); //on click
}; //renderSpecificNeighborhood

function initializeCrud(){

  console.log("initializeCrud");
  //when the add place button is clicked, display the modal
  $("#openPlaceModal").click(function (){
    console.log("Button open place modal clicked!");
    currentNeighborhoodId = $(this).closest('.Neighborhood').data('neighborhood-id');
    $('#modal1').data('neighborhood-id', currentNeighborhoodId);
    $('#modal1').modal();//display the modal!
    //Form Option Select
    $('select').material_select();
  }); //WORKING

  //Initialize edit place modal
  $(".edit_place").click(function(){
    console.log("Button open edit_place clicked!");
    placeToUpdateId = $(this).closest('.place-id').data('place-id');
    console.log(placeToUpdateId, "placeToUpdateId when edit place modal clicked");
    $('#modal2').modal();
    //Form Option Select
    $('select').material_select();

  }); //WORKING

  //add place button
  $('#addPlace').on('click', function(target){
    target.preventDefault();
    var $modal1 = $('#modal1');
    var $placeNameField = $modal1.find('#place_name');
    var $placeAddressField = $modal1.find('#place_address');
    var $placeCategoryField = $modal1.find('#place_category');
    var $placeGoodStuffField = $modal1.find('#good_stuff');
    var $placeOpeningHourField = $modal1.find('#opening_hour');
    var $placeClosingHourField = $modal1.find('#closing_hour');
    var dataToPost = {
      name: $placeNameField.val(),
      address: $placeAddressField.val(),
      category: $placeCategoryField.val(),
      goodStuff: $placeGoodStuffField.val(),
      openingHour: $placeOpeningHourField.val(),
      closingHour: $placeClosingHourField.val()
      };
    var testId = $modal1.data(testId);
    var url = 'api/neighborhoods/' + neighborhoodId + '/places';

    $.ajax({
      method: 'POST',
      url: url,
      data: dataToPost,
      success: newPlaceSuccess,
      error: newPlaceError
    });
  }); //WORKING

  //edit place button
  $('#editPlace').on('click', function(target){
    target.preventDefault();
    // console.log('this serialized', $(this).serialize());
    console.log(placeToUpdateId, " place id when save changes button clicked")
    var $modal2 = $('#modal2');
    var $placeNameField = $modal2.find('#place_name');
    var $placeAddressField = $modal2.find('#place_address');
    var $placeCategoryField = $modal2.find('#place_category');
    var $placeGoodStuffField = $modal2.find('#good_stuff');
    var $placeOpeningHourField = $modal2.find('#opening_hour');
    var $placeClosingHourField = $modal2.find('#closing_hour');

    var dataToUpdate = {
      name: $placeNameField.val(),
      address: $placeAddressField.val(),
      category: $placeCategoryField.val(),
      goodStuff: $placeGoodStuffField.val(),
      openingHour: $placeOpeningHourField.val(),
      closingHour: $placeClosingHourField.val()
    }
    $.ajax({
      method: 'PATCH',
      url: 'api/neighborhoods/' + neighborhoodId +'/places/'+ placeToUpdateId,
      data: dataToUpdate,
      success: editPlaceSuccess,
      error: editPlaceError
    });
  });


  //Initialize delete place modal
  $(".delete_place").click(function (){
    console.log("Delete Button clicked!");
    var currentPlaceId = $(this).closest('.place-id').data('place-id');
    console.log(neighborhoodId + ", " + currentPlaceId);
    var url = '/api/neighborhoods/' + neighborhoodId + '/places/' + currentPlaceId;
    console.log('send DELETE ', url);
    $.ajax({
      method: 'DELETE',
      url: url,
      success: handlePlaceDeleteResponse
    });
  }); //WORKING

  function handlePlaceDeleteResponse(data) {
    console.log('handleSongDeleteResponse got ', data);
    var placeIdToDelete = data._id;
    allNeighborhoods.forEach(function(neighborhood){
      if(neighborhood._id === neighborhoodId){
        neighborhood.places.forEach(function (place, i){
          if(place._id === placeIdToDelete){
            neighborhood.places.splice(i,1);
          }
        });
        console.log(neighborhood.places, "this is neighborhood after splice");
      }
    });

    var $divToDelete = $('#' + placeIdToDelete);
    console.log($divToDelete)
    $divToDelete.remove();
  }; //WORKING
}

function onSuccess(json){
  allNeighborhoods = json;
  console.log("allNeighborhoods ", allNeighborhoods);

  renderAllNeighborhoods();
  //renderSpecificNeighborhood();
}



function onError(){
  $('#neighborhoodTarget').text('Failed to load neighborhoods, is the server running?');

}

function newPlaceSuccess(data){
  allNeighborhoods.forEach(function(neighborhood){
    if(neighborhood._id === neighborhoodId){
      neighborhood.places.push(data);
    }
  });

  renderSpecificNeighborhood();

} //NOT APPENDING DATA TO PAGE

function newPlaceError(){
  console.log('new place error!');
}

function editPlaceSuccess(data){
  $('#newPlaceForm input').val('');
  allNeighborhoods.forEach(function(neighborhood){
    if(neighborhood._id === neighborhoodId){
      neighborhood.places.forEach(function (place, i){
        if(place._id === placeToUpdateId){
          neighborhood.places.splice(i,1,data);
        }
      });
      console.log(neighborhood.places, "this is neighborhood after splice");
    }
  });
  renderSpecificNeighborhood();
}

function editPlaceError(){
  console.log("edit place error")

}
