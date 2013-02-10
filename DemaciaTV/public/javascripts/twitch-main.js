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
	
	var player = $('#api_player')[0]
	  , muted = false;
	console.log(player);
	
	$('p.stream-controls').append('<a href="#" id="soundtoggle">Toggle audio</a>');
	$('#soundtoggle').click(function() {
		if(muted) {
			player.unmute();
			muted = false;
		} else {
			player.mute();
			muted = true;
		}
	});
});
