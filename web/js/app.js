
// https://codepen.io/mikethedj4/pen/snjpF
$(document).ready(function() {
  $(".device-list li").draggable({
    //  use a helper-clone that is append to "body" so is not "contained" by a pane
    helper: function() {
      return $(this).clone().addClass('moveDevice').appendTo("#device-drop").css({
        "zIndex": 5
      }).show();
    },
    cursor: "move",
    containment: "html"
  });

  $("#device-drop").droppable({
    hoverClass: "ui-state-hover",
    accept: ".device-list li",
    drop: function(event, ui) { 
      if (!ui.draggable.hasClass("dropped"))
        $(this).append($(ui.draggable).clone().removeClass("ui-draggable-handle ui-draggable add-element").removeClass("dropped").addClass('DeviceElement').append('<span class="closing"><i class="icon-close"></i></span>'));

      $('li.DeviceElement span').on('click', function() {
          $(this).parent().remove();
      });
    }
  }).sortable({
    placeholder: "sort-placer",
    cursor: "move",
    helper: function (evt, ui) {
      return $(ui).clone().appendTo("#device-drop").show();
    }
  });



// simulator drag

$(".simulator-device-list li").draggable({
    //  use a helper-clone that is append to "body" so is not "contained" by a pane
    helper: function() {
      return $(this).clone().addClass('simulator-moveDevice').appendTo("#simulator-device-drop").css({
        "zIndex": 5
      }).show();
    },
    cursor: "move",
    containment: "html"
  });

  $("#simulator-device-drop").droppable({
    hoverClass: "ui-state-hover",
    accept: ".simulator-device-list li",
    drop: function(event, ui) { 
      if (!ui.draggable.hasClass("dropped"))
        $(this).append($(ui.draggable).clone().removeClass("ui-draggable-handle ui-draggable add-element").removeClass("dropped").addClass('DeviceElement').append('<span class="closing"><i class="icon-close"></i></span>'));

      $('li.DeviceElement span').on('click', function() {
          $(this).parent().remove();
      });
    }
  }).sortable({
    placeholder: "sort-placer",
    cursor: "move",
    helper: function (evt, ui) {
      return $(ui).clone().appendTo("#simulator-device-drop").show();
    }
  });



// list view slide

$('.simulator-list-view').hover(function() {
  $(this).children().children('.simulation-list-option').toggleClass('show');
});
  

// $('.simulator-drop-section button').click(function() {
  
//    $('.simulator-drag-section').slideToggle('slow', function() {
//    $('.simulator-drop-section').toggleClass('selecionado');
//   });
// });


$("#btn").click(function () {

        // $("#Create").toggle();
        $('#simulator-drag-box').slideToggle('slow', function() {
        $('.simulator-drop-section').toggleClass('drop-box-minimize');
        });
    });




// search js

//jQuery(document).ready(function($){

$('.device-search-list li').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('.device-search-box').on('keyup', function(){

var searchTerm = $(this).val().toLowerCase();

    $('.device-search-list li').each(function(){

        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

});

//});

// subscribtion section


$(function () {
    $("#btnAdd").bind("click", function () {
        var div = $("<tr />");
        div.html(GetDynamicTextBox(""));
        $("#TextBoxContainer").append(div);
    });
    $("body").on("click", ".remove", function () {
        $(this).closest("tr").remove();
    });
});
function GetDynamicTextBox(value) {
    return '<td><input name = "DynamicTextBox" type="text" value = "' + value + '" class="form-control" /></td>' + '<td><select name="" class="form-control"><option> Select</option><option> Male</option><option> Female</option></select></td>' + '<td><input name = "DynamicTextBox" type="radio" value = "' + value + '" /></td>' + '<td><input name = "DynamicTextBox" type="checkbox" value = "' + value + '" /></td>' + '<td><button type="button" class="btn btn-danger remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}



});