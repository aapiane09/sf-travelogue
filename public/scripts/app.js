$(document).ready(function(){
  console.log("DOM Ready!");

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
