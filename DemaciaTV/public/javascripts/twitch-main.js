var DemaciaTV = function() {
	return {
		changeStream: function(channel, cindex) {
			$('#stream_'+ cindex +' param[name="flashvars"]').attr('value', 'hostname=www.twitch.tv&channel=' 
				+ channel + '&auto_play=true&enable_javascript=true&start_volume=100');
			$('#chat_'+ cindex).attr('src', 'http://www.twitch.tv/chat/embed?channel=' 
				+ channel + '&hide_chat=myspace,facebook,twitter&default_chat=jtv');
			var stream = $('#stream_1');
			var chat = $('#chat_1');
			$('#stream_'+ cindex).remove();
			$('#chat_'+ cindex).remove();
			$('.stream-container_'+ cindex).append(stream);
			$('.chat-container').append(chat);
		}
	};
}();

$(document).ready(function() {

	Twitch.init({clientId: 'j0yll37nxeynttp6x4jb9sj4d4v9ev3'}, function(error, status) {
		if (error) {
			// error encountered while loading
			console.log(error);
		}
		// the sdk is now loaded
		if (status.authenticated) {
			// already logged in, hide button
			//$('.twitch-connect').hide()
			//$('.twitch-connect').after('<p>Connected</p>');
			Twitch.api({method: 'user'}, function(error, user) {
				$('.connected').text('Connected as ' + user.display_name);
			});
		}
	})
	
	// Make the connect sbutton work
	$('.twitch-connect').click(function() {
		Twitch.login({
			//popup: true,
			scope: ['user_read', 'channel_read']
		});
	})
	
	var player = $('#stream_1')[0]
	  , muted_1 = false;
	console.log(player);
	
	$('p.stream-controls').append('<a href="#" id="soundtoggle">Toggle audio</a>');
	$('#soundtoggle').click(function() {
		if(muted_1) {
			player.unmute();
			muted_1 = false;
		} else {
			player.mute();
			muted_1 = true;
		}
	});
	
	$('p.stream-controls').append('<br /><a href="#" id="streamtoggle"> Toggle stream</a>');
	$('#streamtoggle').click(function() {
		$('#stream_1').toggle();
		$('#chat_1').toggle();
	});
	
	$('#picker').keydown(function (e){
		if(e.keyCode == 13) DemaciaTV.changeStream($('#picker').val(), '1');
	})
});
