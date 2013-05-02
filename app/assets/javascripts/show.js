$(document).ready(function(){

	// var originalGmail;
	// var original
	var emailAddr = "delian@mit.edu"
	var twitterHandle = "@MITDelian"
	// Define interaction button click functions
	$('#facebook-post').click(function(){
		var msg = $('#facebook-input').val();
		if(msg != ''){
			addToHistory('facebook', msg);
			$('#facebook-input').val('');
			showMessage('Shared with Delian');
		}
	});
	$('#send-email').click(function(){
		var to = $('#gmail-to').val()
		var memo = $('#gmail-input').val()
		if (to != '' && memo != ''){
			var msg = "Email to: " + to;
			if ($('#gmail-cc').val() != ''){
				msg += ", " + $('#gmail-cc').val();
			}
			if ($('#gmail-bcc').val() != ''){
				msg += ", " + $('#gmail-bcc').val();
			}
			msg += ": " + memo;
			addToHistory('gmail', msg);
			$('#gmail-input').val('');
			$('#gmail-to').val(emailAddr);
			$('#gmail-cc').val('');
			$('#gmail-bcc').val('');
			showMessage('Your message has been sent');
		}
	});
	$('#linkedin-share').click(function(){
		var msg = $('#linkedin-input').val();
		if(msg != ''){
			addToHistory('linkedin', msg);
			$('#linkedin-input').val('');
			showMessage('Shared with Delian');
		}
	});

	// Simulates sending a Tweet
	$('#send-tweet').click(function(){
		if($('#send-tweet').hasClass('btn-primary')){
			var msg = $('#twitter-input').val();
			$('#twitter-input').val(twitterHandle);
			addToHistory("twitter", msg);
			showMessage('Successful Tweet!');
			getCharCount();
		}
	});

	$('li').click(function(){
		if(!$(this).hasClass('active')){
			$('.history-reply-container').remove();
			$('.history-item').removeClass('history-item-selected');
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
		if ($('#twitter-input').val()){
			var charCount = $('#twitter-input').val().length;
			$('#char-remain').text(140-charCount);
			return charCount;
		}
	}

	function addToHistory(source, message){
		var imageSrc = "assets/" + source + ".png";
		var html = '<div class="history-item ' + source+'-history'+ '"><img src=';
		html += imageSrc;
		html += ' class="history-icon" />';
		html += message;
		html += "</div>"
		$('.history').prepend(html);
	}

	// Initializes input fields with appropriate information
	$('#gmail-to').val(emailAddr);
	getCharCount();
	$('#alert-container').hide();
})

