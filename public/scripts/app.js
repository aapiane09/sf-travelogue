$(document).ready(function(){
console.log("DOM Ready!");

//Initialize Form Modal
  $(".btn").click(function (){
    console.log("Button clicked!");
    $('#modal1').modal();
  })

//Form Option Select
  $('select').material_select();


});
