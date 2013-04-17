$(document).ready(function(){

	// Define interaction button click functions
	$('#facebook-interaction').click(function(){
		console.log("clicked facebook");
	});
	$('#gmail-interaction').click(function(){
		console.log("clicked gmail");
	});
	$('#linkedin-interaction').click(function(){
		console.log("clicked linkedin");
	});
	$('#phone-interaction').click(function(){
		console.log("clicked phone");
	});
	$('#twitter-input').bind('keyup', function(){
		var currentChars = $('#twitter-input').val().length;
		$('#char-remain').text(140-currentChars);
		if(currentChars > 140){
			$('#char-remain').css('color', 'red');
			if($('#send-tweet').hasClass('btn-primary')){
				$('#send-tweet').addClass('btn-danger').removeClass('btn-primary');
			}
		}else{
			$('#char-remain').css('color', 'black');
			if(!$('#send-tweet').hasClass('btn-primary')){
				$('#send-tweet').removeClass('btn-danger').addClass('btn-primary');
			}
		}
	});
	$('#send-tweet').click(function(){
		if($('#send-tweet').hasClass('btn-primary')){
			$('.twitter-input-container').html('Tweet Posted!');
		}else{
			// Insert warning about over tweet
		}
	});

	$('.history-item-show').click(function(){
		$(".history-item-show").css("background-color", "white");
		$(this).css("background-color", "rgba(14, 90, 120,.1)");
		var historyItemText = $(this).text();
		$('#interaction').text(historyItemText);
	});


})

