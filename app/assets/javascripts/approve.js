$(document).ready(function(){
  var tags = ['Investor', 'Beta', 'Advisor', 'Reporter']
  $('#tags-input').typeahead({
      source: tags
    });
  $('#tags-input').keyup(function(event)  {
    if(event.keyCode == 13){
      var tag = $('#tags-input').val();
      appendTag(tag);
      $('#tags-input').val('');
    }
  });
  function appendTag(tag){
    $('#tags').append("<li class='active' data-filter='."+tag.toLowerCase()+"'><a>" + tag + "</a></li>")
  };

  function bringBack() {
    $('#tags').empty();
    $('#approve-container').css("left","0px");
    $('#approve-container').css("opacity","0");
    $('#approve-container').show();
    $('#approve-container').animate({
      opacity: 1
    }, 500, function() {
    });
  }
  $("#approve").click(function() {
    if ($('#tags').children().length > 0) {
      $('#approve-container').animate({
        left: '+=2000',
        opacity: 0.1
      }, 500, function() {
        $('#approve-container').hide();
        setTimeout(callback(), 2000);
      });
    } else {
      alert("Please enter tags");
    }
  });
  $("#reject").click(function() {
    $('#approve-container').animate({
      left: '-=2000',
      opacity: 0.1
    }, 500, function() {
      $('#approve-container').hide();
      setTimeout(callback(), 2000);
    });
  });
  $("#later").click(function() {
    $('#approve-container').rotate({
        angle: 0,
        animateTo: 0 + 720,
        duration: 1900
    });
    $('#approve-container').animate({
      opacity: 0
    }, 1200, function() {
      $('#approve-container').hide();
      setTimeout(callback(), 2000);
    });
  });
  function callback(){
    return function(){
      bringBack();
    }
  }
})