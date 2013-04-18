//= require jquery.isotope.min.js
$.Isotope.prototype._getCenteredMasonryColumns = function() {
  this.width = this.element.width();
  
  var parentWidth = this.element.parent().width();
  
                // i.e. options.masonry && options.masonry.columnWidth
  var colW = this.options.masonry && this.options.masonry.columnWidth ||
                // or use the size of the first item
                this.$filteredAtoms.outerWidth(true) ||
                // if there's no items, use size of container
                parentWidth;
  
  var cols = Math.floor( parentWidth / colW );
  cols = Math.max( cols, 1 );

  // i.e. this.masonry.cols = ....
  this.masonry.cols = cols;
  // i.e. this.masonry.columnWidth = ...
  this.masonry.columnWidth = colW;
};

$.Isotope.prototype._masonryReset = function() {
  // layout-specific props
  this.masonry = {};
  // FIXME shouldn't have to call this again
  this._getCenteredMasonryColumns();
  var i = this.masonry.cols;
  this.masonry.colYs = [];
  while (i--) {
    this.masonry.colYs.push( 0 );
  }
};

$.Isotope.prototype._masonryResizeChanged = function() {
  var prevColCount = this.masonry.cols;
  // get updated colCount
  this._getCenteredMasonryColumns();
  return ( this.masonry.cols !== prevColCount );
};

$.Isotope.prototype._masonryGetContainerSize = function() {
  var unusedCols = 0,
      i = this.masonry.cols;
  // count unused columns
  while ( --i ) {
    if ( this.masonry.colYs[i] !== 0 ) {
      break;
    }
    unusedCols++;
  }
  
  return {
        height : Math.max.apply( Math, this.masonry.colYs ),
        // fit container to columns that have been used;
        width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
      };
};

$(function(){
  
  var $container = $('#container');
  
  
    // add randomish size classes
    $container.find('.element').each(function(){
      var $this = $(this),
          number = parseInt( $this.find('.number').text(), 10 );
      if ( number % 7 % 2 === 1 ) {
        $this.addClass('width2');
      }
      if ( number % 3 === 0 ) {
        $this.addClass('height2');
      }
    });
  
  $container.isotope({
    itemSelector : '.element',
    masonry : {
      columnWidth : 120
    },
    getSortData : {
      symbol : function( $elem ) {
        return $elem.attr('data-symbol');
      },
      category : function( $elem ) {
        return $elem.attr('data-category');
      },
      number : function( $elem ) {
        return parseInt( $elem.find('.number').text(), 10 );
      },
      weight : function( $elem ) {
        return parseFloat( $elem.find('.weight').text().replace( /[\(\)]/g, '') );
      },
      name : function ( $elem ) {
        return $elem.find('.name').text();
      }
    }
  });
    
  
    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }
      
      return false;
    });


  
    $('#insert a').click(function(){
      var $newEls = $( fakeElement.getGroup() );
      $container.isotope( 'insert', $newEls );

      return false;
    });

    $('#append a').click(function(){
      var $newEls = $( fakeElement.getGroup() );
      $container.append( $newEls ).isotope( 'appended', $newEls );

      return false;
    });


  
    // change size of clicked element
    $container.delegate( '.element', 'click', function(){
      $(this).toggleClass('large');
      $container.isotope('reLayout');
    });

    // toggle variable sizes of all elements
    $('#toggle-sizes').find('a').click(function(){
      $container
        .toggleClass('variable-sizes')
        .isotope('reLayout');
      return false;
    });


  var $sortBy = $('#sort-by');
  $('#shuffle a').click(function(){
    $container.isotope('shuffle');
    $sortBy.find('.selected').removeClass('selected');
    $sortBy.find('[data-option-value="random"]').addClass('selected');
    return false;
  });
  
});


$(document).ready(function(){

  $beta = $('.beta');
  $investor = $('.investor');
  $reporter = $('.reporter');
  $advisor = $('.advisor');

  for(var i=0; i<4; i++)
  {
    $beta.clone().appendTo("#contact-grid");
    $investor.clone().appendTo("#contact-grid");
    $reporter.clone().appendTo("#contact-grid");
    $advisor.clone().appendTo("#contact-grid");
  }

	$('#contact-grid').isotope({
		itemSelector: '.contact-card',
    masonry: {
      columnWidth: 148
    },
    // layoutMode: 'perfectMasonry',
    // perfectMasonry: {
    //   columnWidth: 148,
    //   rowHeight: 148
    // },
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
      appendTag(tag);
      $('#search-bar').val('');
      filter();      
    }
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

  $('.card-name').click(function(event){
    event.stopPropagation();
    window.location = window.location.href + "show";
  });

  $('.card-pic').click(function(){
    var $card = $(this).parent().parent().parent();
    if($card.hasClass('small-card')){
      $card.removeClass('small-card');
      $card.addClass('medium-card');
      $card.find('.card-name').fadeOut();
      $card.find('.medium-detail').css("display", "inline-block");
    }
    else if($card.hasClass('medium-card')){
      $card.removeClass('medium-card');
      $card.addClass('large-card');
      $card.find('.large-detail').show();
    }
    else if($card.hasClass('large-card')){
      $card.find('.large-detail').hide();
      $card.find('.card-name').fadeIn();
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