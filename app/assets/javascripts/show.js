$(document).ready(function(){

	// var originalGmail;
	// var original
	var emailAddr = "delian@mit.edu"
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
	$('#facebook-post').click(function(){
		$('#facebook-input').val('');
		showMessage('Shared with Delian');
	});
	$('#send-email').click(function(){
		$('#gmail-input').val('');
		$('#gmail-to').val(emailAddr);
		$('#gmail-cc').val('');
		$('#gmail-bcc').val('');
		showMessage('Your message has been sent');
	});
	$('#linkedin-share').click(function(){
		$('#linkedin-input').val('');
		showMessage('Shared with Delian');
	});
	// Twitter Character counter
	$('#twitter-input').bind('keyup', function(){
		if(getCharCount() > 140){
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

	// Simulates sending a Tweet
	$('#send-tweet').click(function(){
		if($('#send-tweet').hasClass('btn-primary')){
			$('#twitter-input').val('');
			showMessage('Successful Tweet!');
			getCharCount();
		}
	});

	function showMessage(message){
		$('#alert-message').text(message);
		$('#alert-container').show();
		setTimeout(function(){
			$('#alert-container').hide(400);
		}, 2500);
	}

	function getCharCount(){
		var charCount = $('#twitter-input').val().length;
		$('#char-remain').text(140-charCount);
		return charCount;
	}

	// Initializes input fields with appropriate information
	$('#gmail-to').val(emailAddr);
	$('#twitter-input').val('@MITDelian');
	getCharCount();
	$('#alert-container').hide();
})

