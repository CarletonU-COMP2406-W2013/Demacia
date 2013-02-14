var DemaciaTV = (function () {
  return {
    changeStream: function(channel, cindex) {
      Twitch.api({method: 'users/' + channel}, function(error, user){
        if(error){
          console.log(error);
          $('#picker').after('<span class="stream-error"> ' + error.message + '</span>');
          $('.stream-error').fadeOut(1500, function() { $(this).remove(); });
          return;
        }
        $('#stream_'+ cindex).remove();
        $('#chat_'+ cindex).remove();
        DemaciaTV.addStream(channel, cindex, user.display_name);
        DemaciaTV.addChat(channel, cindex);
      });
    },
    addStream: function(channel, cindex, user) {
      $('#stream-container_'+cindex).livestream(channel, {
        width: 600,
        height: 400,
        autoPlay: true,
        startVolume: 100,
        cindex: cindex,
        //onLive: function(element, streamer) { },
        //onOffline: function(element, streamer) { }
      });
      $('h1.stream-title').text('Currently watching: ' + user);
    },
    addChat: function(channel, cindex) {
      $('#chat-container').append('<iframe width="300px" height="100%" id="chat_'
        +cindex+'" scrolling="no" frameborder="0" '+
        'src="http://www.twitch.tv/chat/embed?channel='+channel+'"></iframe>');
    }
  };
}());

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
      Twitch.api({method: 'user'}, function(error, user) {
        $('.connected').text('Connected as ' + user.display_name);
      });
    }
  });
  
  // Add the default stream and chat
  DemaciaTV.addStream('riotgames', '1', 'Riot Games');
  DemaciaTV.addChat('riotgames', '1');

  // Make the connect button work
  $('.twitch-connect').click(function() {
    Twitch.login({
      //popup: true,
      scope: ['user_read', 'channel_read']
    });
  });
  
  // Sound toggle
  var container = $('#stream-container_1').data('mute', 'false')
    , player = $('#stream_1')[0];
  window.setTimeout(function() { player.unmute(); }, 3000);
  $('p.stream-controls').append('<a href="#" id="soundtoggle">Toggle audio</a>');
  $('#soundtoggle').click(function() {
    if(container.data('mute') === 'true') {
      player.unmute();
      container.data('mute', 'false');
    } else {
      player.mute();
      container.data('mute', 'true');
    }
  });
  
  // Hider
  $('p.stream-controls').append('<br /><a href="#" id="streamtoggle"> Toggle stream</a>');
  $('#streamtoggle').click(function() {
    $('#stream-container_1').toggle();
  });

  // Slide to close the chat and expand other sections
  $('p.chat-controls').append('<br /><a href="#" id="chattoggle"> Toggle chat</a>');
  $('#chattoggle').click(function() {
    $('#chat-container').animate({ width: 'toggle'}, 1000);
    if($('#header').css('right') === '0px') {
      $('#header').animate({right: '300px'}, 1000);
      $('#content').animate({right: '300px'}, 1000);
      $('#footer').animate({right: '300px'}, 1000);
    } else {
      $('#header').animate({right: '0'}, 1000);
      $('#content').animate({right: '0'}, 1000);
      $('#footer').animate({right: '0'}, 1000);
    }
  });
  
  // Change stream on enter in the text box
  $('#picker').keydown(function (e){
    if(e.keyCode === 13) {
      DemaciaTV.changeStream($(this).val(), '1');
    }
  });
});
