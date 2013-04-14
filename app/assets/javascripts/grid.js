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
  // $('#search-bar').autocomplete({
  //   source: tags
  // });

  $('#search-button').click(function(e){
    $('#search-bar').autocomplete("close");
    var tag = $('#search-bar').val();
    appendTag(tag);
  });

  function appendTag(tag){
    $('#top-tags').append("<span class='label label-success'>" + tag + "</span>")
  };
})