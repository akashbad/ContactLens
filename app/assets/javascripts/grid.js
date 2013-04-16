$(function(){
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

  $('#search-button').click(function(e){
    var tag = $('#search-bar').val();
    appendTag(tag);
  });

  function appendTag(tag){
    $('#search-tags').append("<li class='active'><a href='#'>" + tag + "</a></li>")
  };
})