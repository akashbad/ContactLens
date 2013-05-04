$(document).ready(function(){

	var emailAddr = "delian@mit.edu"
	var twitterHandle = "@MITDelian"
	// Define interaction button click functions

	$('#linkedin-share').click(function(){
		var msg = $('#linkedin-input').val();
		if(msg != ''){
			addToHistory('linkedin', msg);
			$('#linkedin-input').val('');
			showMessage('Shared with Delian');
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

	function addToHistory(source, message){
		var imageSrc = "assets/" + source + ".png";
		var html = '<div class="history-item ' + source+'-history'+ '"><img src=';
		html += imageSrc;
		html += ' class="history-icon" />';
		html += message;
		html += "</div>"
		$('.history').prepend(html);
	}
	$('#alert-container').hide();
})

