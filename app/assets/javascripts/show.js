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
			$('.history-item').removeClass('selected-history-item');
		}
	});
	function enableHistorySelection(){
		$('.history-item').click(function(){
			$('.history-reply-container').remove();
			$('.history-item').removeClass('selected-history-item');
			$(this).addClass('selected-history-item');
			var text = $(this).text();
			var html = '<div class="row history-reply-container"><div class="span12"></div><div class="row"><div class="history-reply offset2 span8">'
			html += text+'</div></div></div>';
			if ($(this).hasClass("twitter-history")){
				$('#twitter').prepend(html);
				$('#tabs a[href="#twitter"]').tab('show');
			}else if($(this).hasClass('facebook-history')){
				$('#facebook').prepend(html);
				$('#tabs a[href="#facebook"]').tab('show');
			}else if($(this).hasClass('linkedin-history')){
				$('#linkedin').prepend(html);
				$('#tabs a[href="#linkedin"]').tab('show');
			}else if($(this).hasClass('gmail-history')){
				$('#gmail').prepend(html);
				$('#tabs a[href="#gmail"]').tab('show');
			}else if($(this).hasClass('phone-history')){
				$('#tabs a[href="#phone"]').tab('show');
			}else if($(this).hasClass('calendar-history')){
				$('#tabs a[href="#calendar"]').tab('show');
			}
		});
	}
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
		enableHistorySelection();
	}

	// Initializes input fields with appropriate information
	enableHistorySelection();
	$('#gmail-to').val(emailAddr);
	$('#twitter-input').val(twitterHandle);
	getCharCount();
	$('#alert-container').hide();
})

