//app.js
var template;
var $neighborhoodsList;
var allNeighborhoods = [];
var neighborhoodId;
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
  }) //forEach
    $('#neighborhoodTarget').off('click', '.neighborhood-id');
    console.log("after forEach");
    initializeCrud();
  }); //on click
}; //render

function initializeCrud(){
  console.log("initializeCrud")
  //when the add place button is clicked, display the modal
  $("#openPlaceModal").click(function (){
    console.log("Button open place modal clicked!");
    currentNeighborhoodId = $(this).closest('.Neighborhood').data('neighborhood-id');
    $('#modal1').data('neighborhood-id', currentNeighborhoodId);
    $('#modal1').modal();//display the modal!
  }); //WORKING

  //Initialize edit place modal
  $(".edit_place").click(function(){
    console.log("Button open edit_place clicked!");
    var currentPlaceId = $(this).closest('.place-id').data('place-id');
    console.log(currentPlaceId)
    $('#modal2').modal();
  }); //WORKING

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
  }); //WORKING

// ​
//   //edit place button
//   $('#editPlace').on('click', function(target){
//     target.preventDefault();
//     console.log('this serialized', $(this).serialize());
//     $.ajax({
//       method: 'PUT',
//       url: 'api/neighborhoods/'+neighborhoodId+'/places/'+placeId,
//       data: $(this).serialize(),
//       success: editPlaceSuccess,
//       error: editPlaceError
//     });
//   });
// }
//

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
  var $divToDelete = $('#' + placeIdToDelete);
  console.log($divToDelete)
  $divToDelete.remove();
} //WORKING

//   //Initialize edit place modal
//   $("#edit_place").click(function(){
//     console.log("Button clicked!");
//     $('#modal2').modal();
//   });
//
}

function onSuccess(json){
  allNeighborhoods = json;
  console.log("allNeighborhoods ", allNeighborhoods);
  render();
}



function onError(){
  $('#neighborhoodTarget').text('Failed to load neighborhoods, is the server running?');

}

function newPlaceSuccess(data){
  console.log("new place success", data)
  var newPlaceSource = $('#place-template').html();
  console.log(newPlaceSource);
  var newPlaceTemplate = Handlebars.compile(newPlaceSource);
  console.log('Hit new place template!')
  var newPlaceHtml = newPlaceTemplate({ places : data});
  console.log("New Place Html ", newPlaceHtml);
  // $('#neighborhoodTarget').remove();
  // render();
} //NOT APPENDING DATA TO PAGE

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
