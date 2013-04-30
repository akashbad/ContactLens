//= require jquery.isotope.min.js

$(document).ready(function(){

	$('#contact-grid').isotope({
		itemSelector: '.contact-card',
    layoutMode: 'perfectMasonry',
    perfectMasonry: {
      columnWidth: 148,
      rowHeight: 148
    },
    animationEngine: "best-available"
	});

  $('#contact-grid').isotope('shuffle');

  var tags = ['Investor', 'Beta', 'Advisor', 'Reporter']
  $('#search-bar').typeahead({
    source: tags
  });

  $('#search-bar').keyup(function(event)  {
    if(event.keyCode == 13){
      $('#search-button').click();
    }
  });

  $('#search-button').click(function(event){
    var tag = $('#search-bar').val();
    if(tag != ""){
      appendFilter(tag);
      $('#search-bar').val('');
      filter();      
    }
  });

  $('#search-tags').on('click', 'li a', function(event){
    event.preventDefault();
    $(this).parent().toggleClass("active");
    if($(event.target).is("button")){
      $(this).parent().removeClass("active");
    }
    filter();
  });

  function appendFilter(tag){
    $("#search-tags li.active:visible").each(function(index, element){
      $(this).toggleClass("active");
    });
    $('#search-tags').append(
      "<li class='active' data-filter='."+tag.toLowerCase()+"'><a>" + tag + "<button type='button' class='close' data-dismiss='alert'>×</button></a></li>")
    };

  function filter(){
    $("#none").fadeOut();
    var isoFilters = [];
    $("#search-tags li.active:visible").each(function(index, elem){
      isoFilters.push($(elem).attr('data-filter'));
    });
    $('#contact-grid').isotope({filter: isoFilters.join(', ')}, function( $items ) {
      len = $items.length;
      if(len == 0){
        $("#none").fadeIn();
        console.log(isoFilters);
      }
    });

  };

  $('.card-name').click(function(event){
    event.stopPropagation();
    window.location = window.location.href + "show";
  });

  $('.card-pic').click(function(){
    var $card = $(this).parent().parent().parent();
    if($card.hasClass('small-card')){
      $card.removeClass('small-card');
      $card.addClass('medium-card');
      // $card.find('.card-name').fadeOut();
      $card.find('.medium-detail').css("display", "inline-block");
    }
    else if($card.hasClass('medium-card')){
      $card.removeClass('medium-card');
      $card.addClass('large-card');
      $card.find('.large-detail').show();
    }
    else if($card.hasClass('large-card')){
      $card.find('.large-detail').hide();
      // $card.find('.card-name').fadeIn();
      $card.find('.medium-detail').hide();
      $card.removeClass('large-card');
      $card.addClass('small-card');
    }
    $('#contact-grid').isotope('reLayout');
  });

  $('.card-button').click(function(event)
  {
    window.location = window.location.href + "show";
  });

  $('.history-item-grid').click(function(event)
  {
    window.location = window.location.href + "show";
  });


})