//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
var neighborhoodId;
var $placeList;
var placeTemplate;
var placeToUpdateId;
var currentNeighborhoodId;

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

  //event listener for click on neighborhood card
  $('#neighborhoodTarget').on('click','.neighborhood-id', function(e){
    neighborhoodId = $(this).data('neighborhood-id');
    renderSpecificNeighborhood();
    $('#remove').remove()
    //Turns off event listeners for choosing neighborhoods
    $('#neighborhoodTarget').off('click', '.neighborhood-id');
  }); //on click
}); //Document On Ready

function onSuccess(json){
  allNeighborhoods = json;
  render();
}

function onError(){
  $('#neighborhoodTarget').text('Failed to load neighborhoods, is the server running?');
}

function render(){
  var neighborhoodHtml;
  allNeighborhoods.forEach(function(neighborhood){
    neighborhoodHtml = template({ neighborhood: neighborhood });
    $neighborhoodsList.append(neighborhoodHtml);
  });
}; //render

function renderSpecificNeighborhood () {
  var placeHtml;
  var neighborhoodHtml;

  $('#neighborhoodTarget').empty();

  allNeighborhoods.forEach(function(neighborhood){
    neighborhoodHtml = template({ neighborhood: neighborhood });
    placeHtml = placeTemplate({neighborhood: neighborhood});

    if(neighborhood._id === neighborhoodId){
      $neighborhoodsList.append(neighborhoodHtml);
      $neighborhoodsList.append(placeHtml);
    }
  }); //forEach

  initializeCrud();
  //Unhides Add Place Button
  $('#openPlaceModal').removeClass('hide');
  //Initializes Dropdown in Modals
  $('select').material_select();
}

function initializeCrud(){
//ADD PLACE

  //when the add place button is clicked, display the modal
  $('#openPlaceModal').click(function (){
    currentNeighborhoodId = $(this).closest('.Neighborhood').data('neighborhood-id');
    $('#modal1').data('neighborhood-id', currentNeighborhoodId);
    $('#modal1').modal();//display the modal!
  });

  //when add button inside the add place modal is clicked
  //saves information from the form and sends to database
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

    $.ajax({
      method: 'POST',
      url: 'api/neighborhoods/' + neighborhoodId + '/places',
      data: dataToPost,
      success: newPlaceSuccess,
      error: newPlaceError
    });
  });

  //clears the form and adds the new place to front end allNeighborhood array
  function newPlaceSuccess(data){
    $('#newPlaceForm input').val('');
    allNeighborhoods.forEach(function (neighborhood){
      if(neighborhood._id === neighborhoodId){
        neighborhood.places.push(data);
      }
    });

    renderSpecificNeighborhood();
  }

  function newPlaceError(){
    console.log('new place error!');
  }

//EDIT PLACE
  //when the edit place button is clicked, display the modal
  $('.edit_place').click(function(){
    placeToUpdateId = $(this).closest('.place-id').data('place-id');
    $('#modal2').modal();
  });

  //when edit place button inside the edit place modal is clicked
  //saves information from the form and sends to database
  $('#editPlace').on('click', function(target){
    target.preventDefault();
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

  //clears the form and updates front end neighborhood information
  function editPlaceSuccess(data){
    $('#editPlaceForm input').val('');

    allNeighborhoods.forEach(function(neighborhood){
      if(neighborhood._id === neighborhoodId){
        neighborhood.places.forEach(function (place, i){
          if(place._id === placeToUpdateId){
            neighborhood.places.splice(i,1,data);
          }
        });
      }
    });

    renderSpecificNeighborhood();
  }


  function editPlaceError (){
    console.log("Edit place error!")
  }

//DELETE PLACE

  //when the delete place button is clicked, removes the place from database
  $(".delete_place").click(function (){
    var currentPlaceId = $(this).closest('.place-id').data('place-id');
    var url = '/api/neighborhoods/' + neighborhoodId + '/places/' + currentPlaceId;

    $.ajax({
      method: 'DELETE',
      url: url,
      success: handlePlaceDeleteResponse,
      error: placeDeleteError
    });
  });

  //deletes the place from the front end allNeighborhood array
  function handlePlaceDeleteResponse(data) {
    allNeighborhoods.forEach(function(neighborhood){
      if(neighborhood._id === neighborhoodId){
        neighborhood.places.forEach(function (place, i){
          if(place._id === data._id){
            neighborhood.places.splice(i,1);
          }
        });
      }
    });
    var $divToDelete = $('#' + data._id);
    $divToDelete.remove();
  }//handlePlaceDeleteResponse

    function placeDeleteError(){
        console.log("Place Deletion Error!")
    }

  }
