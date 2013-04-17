$(document).ready(function(){

	// Define interaction button click functions
	$('.interaction-button').click(function(){
		$('.interaction-button').css("background-color", "white");
		$(this).css("background-color", "rgba(14, 90, 120,.1)");
	});
	$('.calendar-interaction').click(function(){
		$('#interaction').html('<iframe src="https://www.google.com/calendar/embed?height=400&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=ryan.m.lau%40gmail.com&amp;color=%23125A12&amp;ctz=America%2FNew_York" style=" border-width:0 " width="400" height="400" frameborder="0" scrolling="no"></iframe>');
		console.log("clicked calendar");
	});
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
	$('#twitter-interaction').click(function(){
		$('#interaction').html('<div class="twitter-input-container"><textarea rows="3" id="twitter-input"></textarea><button class="btn btn-primary" id="send-tweet">Tweet</button><div id="char-remain">140</div></div>');
		$('#twitter-input').bind('keyup', function(){
			var currentChars = $('#twitter-input').val().length;
			$('#char-remain').text(140-currentChars);
			if(currentChars > 140){
				$('#char-remain').css('color', 'red');
				if($('#send-tweet').hasClass('btn-primary') == true){
					$('#send-tweet').addClass('btn-danger').removeClass('btn-primary');
				}
			}else{
				$('#char-remain').css('color', 'black');
				if($('#send-tweet').hasClass('btn-primary') == false){
					$('#send-tweet').removeClass('btn-danger').addClass('btn-primary');
				}
			}
		});
		$('#send-tweet').click(function(){
			$('.twitter-input-container').html('Tweet Posted!');
		})
	});

	$('.history-item-show').click(function(){
		$(".history-item-show").css("background-color", "white");
		$(this).css("background-color", "rgba(14, 90, 120,.1)");
		var historyItemText = $(this).text();
		$('#interaction').text(historyItemText);
	});


})

