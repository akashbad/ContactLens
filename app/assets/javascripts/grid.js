$(function(){
	$('#contact-grid').isotope({
		itemSelector: '.contact-card',
		masonryHorizontal: {
      rowHeight: 128
    },
    animationEngine: "best-available"
	});
})