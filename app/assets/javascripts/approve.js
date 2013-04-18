$(document).ready(function(){
  $()
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
    if(tag != '') {
      $('.first-card .tags').append("<li class='active'><a>" + tag + "<button type='button' class='close' data-dismiss='alert'>×</button></a></li>")
    }
  };

  function bringBack() {
    $('.tags').empty();
    $('.first-card').css("top","60px");
    $('.first-card').css("left","7.5%");
    $('.first-card').css("opacity","0");
    $("#tags-input").removeClass('error');
    $('.first-card').show();
    $('.alerts').empty();
    $('.first-card').animate({
      opacity: 1
    }, 500, function() {
    });
  }
  $("#approve").click(function() {
    if ($('.first-card .tags li:visible').length > 0) {
      $(".alerts").append("<div class='alert alert-success'><button class='close' data-dismiss='alert' type='button'>&times;</button>Sucessfully Approved</div>");
      $('.first-card').animate({
        left: '+=2000',
        opacity: 0.1
      }, 500, function() {
        $('.first-card').hide();
        setTimeout(callback(), 2000);
      });
    } else {
      $("#tags-input").addClass('error');
      $("#tags-input").attr('placeholder', 'Please choose tags');
    }
  });
  $('#tags-input').focus(function() {
    $("#tags-input").removeClass('error');
    $("#tags-input").attr('placeholder', 'Tags');
  });
  $("#reject").click(function() {
    $(".alerts").append("<div class='alert alert-error'><button class='close' data-dismiss='alert' type='button'>&times;</button>Request Rejected and Deleted</div>");

    $('.first-card').animate({
      left: '-=2000',
      opacity: 0.1
    }, 500, function() {
      $('.first-card').hide();
      setTimeout(callback(), 2000);
    });
  });
  $("#later").click(function() {
    $(".alerts").append("<div class='alert alert-warning'><button class='close' data-dismiss='alert' type='button'>&times;</button>Contact moved to bottom of stack</div>");

    $('.first-card').animate({
      top: '+=2000',
      opacity: 0.1
    }, 1500, function() {
      $('.first-card').hide();
      setTimeout(callback(), 2000);
    });
  });
  function callback(){
    return function(){
      bringBack();
    }
  }
})