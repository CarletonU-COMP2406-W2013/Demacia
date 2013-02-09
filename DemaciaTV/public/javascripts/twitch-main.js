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
				$('.twitch-connect').after('<p>Connected as ' + user.name + '</p>');
			});
		}
	})
	
	// Make the button work
	$('.twitch-connect').click(function() {
		Twitch.login({
			//popup: true,
			scope: ['user_read', 'channel_read']
		});
	})
	
	var channel = "steven_bonnell_ii"
	  , volume = 100
	  , player = $('#api_player')[0];
	console.log(player);
	setTimeout(function(){
		//player.play_live(channel);
		player.change_volume(volume);
	},1000);
	
});
