//= require jquery.isotope.min.js

// $.Isotope.prototype._getMasonryGutterColumns = function() {
//     var gutter = this.options.masonry.gutterWidth || 0;
//     containerWidth = this.element.parent().width();
//     this.masonry.columnWidth = this.options && this.options.masonry.columnWidth ||
//       this.$filteredAtoms.outerWidth(true) ||
//       containerWidth;
//     this.masonry.columnWidth += gutter;
//     this.masonry.cols = Math.floor(containerWidth / this.masonry.columnWidth);
//     this.masonry.cols = Math.max(this.masonry.cols, 1);
//   };
 
//   $.Isotope.prototype._masonryReset = function() {
//     this.masonry = {};
//     this._getMasonryGutterColumns();
//     var i = this.masonry.cols;
//     this.masonry.colYs = [];
//     while (i--) {
//       this.masonry.colYs.push( 0 );
//     }
//   };
 
//   $.Isotope.prototype._masonryResizeChanged = function() {
//     var prevColCount = this.masonry.cols;
//     this._getMasonryGutterColumns();
//     return ( this.masonry.cols !== prevColCount );
//   };
 
//   $.Isotope.prototype._masonryGetContainerSize = function() {
//     var gutter = this.options.masonry.gutterWidth || 0;
//     var unusedCols = 0,
//       i = this.masonry.cols;
//     while ( --i ) {
//       if ( this.masonry.colYs[i] !== 0 ) {
//         break;
//       }
//       unusedCols++;
//     }
//     return {
//       height : Math.max.apply( Math, this.masonry.colYs ),
//       width : ((this.masonry.cols - unusedCols) * this.masonry.columnWidth) - gutter
//     };
//   };

$(document).ready(function(){

  $beta = $('.beta');
  $investor = $('.investor');
  $reporter = $('.reporter');
  $advisor = $('.advisor');

  // for(var i=0; i<4; i++)
  // {
  //   $beta.clone().appendTo("#contact-grid");
  //   $investor.clone().appendTo("#contact-grid");
  //   $reporter.clone().appendTo("#contact-grid");
  //   $advisor.clone().appendTo("#contact-grid");
  // }

	$('#contact-grid').isotope({
		itemSelector: '.contact-card',
    // layoutMode: 'perfectMasonry',
    // perfectMasonry: {
    //   columnWidth: 138,
    //   rowHeight: 138
    // },
    animationEngine: "best-available"
	});

  // $('#contact-grid').isotope('shuffle');

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

  $('.card-pic').click(function(){
    var $card = $(this).parent();
    if($card.hasClass('small-card')){
      $card.removeClass('small-card');
      $card.addClass('medium-card')
    }
    else if($card.hasClass('medium-card')){
      $card.removeClass('medium-card');
      $card.addClass('large-card')
    }
    else if($card.hasClass('large-card')){
      $card.removeClass('large-card');
      $card.addClass('small-card')
    }
    $('#contact-grid').isotope('reLayout')
  });

})