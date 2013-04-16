$(document).ready(function(){
	$('#contact-grid').isotope({
		itemSelector: '.contact-card',
		masonryHorizontal: {
      rowHeight: 128
    },
    animationEngine: "best-available",
	});

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
    appendTag(tag);
    $('#search-bar').val('');
    filter();
  });

  $('#search-tags').on('click', 'li a', function(event){
    event.preventDefault();
    $(this).parent().toggleClass("active");
    filter();
  });

  function appendTag(tag){
    $('#search-tags').append("<li class='active' data-filter='."+tag.toLowerCase()+"'><a href='#' >" + tag + "</a></li>")
  };

  function filter(){
    var isoFilters = [];
    $("#search-tags li.active").each(function(index, elem){
      isoFilters.push($(elem).attr('data-filter'));
    });
    $('#contact-grid').isotope({filter: isoFilters.join(', ')});
  };



})