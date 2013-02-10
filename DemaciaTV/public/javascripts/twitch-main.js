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
});
