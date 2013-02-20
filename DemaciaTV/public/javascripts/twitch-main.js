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
        $('#connected').html('&nbsp;Connected as ' + user.display_name);
      });
    }
  });
  
  // Add the default stream and chat
  DemaciaTV.addStream('1', 'riotgames');
  DemaciaTV.addChat('1', 'riotgames');
  //DemaciaTV.addStream('2', 'dreamhacktv');
  //DemaciaTV.addChat('2', 'dreamhacktv');
  
  // Display the navigation
  $('#footer').html('<img src="images/ajax_loader.gif" class="ajax-loader" />');
  DemaciaTV.getTopGames(10);

  // Make the connect button work
  $('.twitch-connect').click(function() {
    Twitch.login({
      //popup: true,
      scope: ['user_read', 'channel_read']
    });
  });
  
  // Dynamic stream size
  $(window).resize(function() {
    var content = $('#content');
    $('#stream_1').width(content.width());
    $('#stream_1').height(Math.min(content.width()/1.7777777777 + 30, content.height()));
  }).resize();

  // Sound hotkeys
  $(document).bind('keydown', '1', function() { DemaciaTV.focusStream('1'); });
  $(document).bind('keydown', '2', function() { DemaciaTV.focusStream('2'); });
  $(document).bind('keydown', '3', function() { DemaciaTV.focusStream('3'); });
  $(document).bind('keydown', '4', function() { DemaciaTV.focusStream('4'); });

  // Hide streams
  $('p.stream-controls').append('<a href="javascript:void(0)" id="streamtoggle"> Toggle stream</a>');
  $('#streamtoggle').click(function() {
    $('#stream-container_1').toggle();
    $('#stream-container_2').toggle();
  });

  // Hide chat
  $('#chat-toggle-left').hide();
  $('#chat-toggle-right').click(DemaciaTV.toggleChat);
  $('#chat-toggle-left').click(DemaciaTV.toggleChat);
  
  // Change stream on enter key in the text box
  $('#picker').keydown(function (e){
    if(e.keyCode === 13) {
      DemaciaTV.changeChannel('1', $(this).val());
    }
  });
});

var DemaciaTV = (function () {
  // Private data goes here:
  var gamesList = {}
    , streamsList = {};


  // Public data goes here:
  return {
    // Gets and displays a list of the top games being streamed
    getTopGames: function (amount) {
      $this = this;
      Twitch.api({method: 'games/top', limit: amount}, function (error, games) {
        $this.displayGames(games);
        $this.gamesList = games;
      });
    },

    // Gets and displays a list of the top streams for a game
    getTopStreamsOfGame: function (game, amount) {
      $this = this;
      Twitch.api({method: 'streams', params: {game: game, limit: amount}}, function (error, streams) {
        $this.displayStreams(streams);
      });
    },

    // Takes a Twitch API 'games' object and displays the list on the page 
    displayGames: function (games) {
      $('#footer').html('');
      $this = this;
      $.each(games.top, function(index, value) {
        $('#footer').append('<p>#'+(index+1)+' <a href="javascript:void(0)" id="nav_game_'+(index+1)+'">'+value.game.name+'</a></p>');
        $('#nav_game_'+(index+1)).click(function () {
          $('#footer').html('<img src="images/ajax_loader.gif" class="ajax-loader" />');
          $this.getTopStreamsOfGame(value.game.name, 10);
        });
      });
    },

    // Takes a Twitch API 'streams' object and displays the list on the page 
    displayStreams: function (streams) {
      $('#footer').html('');
      $this = this;
      $.each(streams.streams, function(index, value) {
        $('#footer').append('<p>#'+(index+1)+' <a href="javascript:void(0)" id="nav_stream_'+(index+1)+'">'+value.channel.name+'</p>');
        $('#nav_stream_'+(index+1)).click(function () {
          $this.displayGames($this.gamesList);
          $this.changeChannel('1', value.channel.name);
        });
      });
    },

    // Toggles the sound of a stream
    toggleSound: function (cindex) {
      ($('#stream-container_'+cindex).data('mute') === 'true') ? this.unmute(cindex) : this.unmute(cindex);
    },
    
    // Gives focus to a specific stream
    // - Mutes all other streams 
    // - Unmutes the focused stream
    // - Brings to front the focused chat
    focusStream: function (cindex) {
      var indexes = ['1', '2', '3', '4'];
      for(var i = 0; i < indexes.length; i++) {
        if(cindex === i) continue;
        this.mute(i);
        $('#chat_'+i).hide();
      }
      this.unmute(cindex);
      $('#chat_'+cindex).show();
    },
    
    // Mutes a specific stream
    mute: function (cindex) {
      $('#stream-container_'+cindex).data('mute', 'true');
      var player = $('#stream_'+cindex)[0];
      if(player !== undefined) player.mute();
    },
    
    // Unmutes a specific stream
    unmute: function (cindex) {
      $('#stream-container_'+cindex).data('mute', 'false');
      var player = $('#stream_'+cindex)[0];
      if(player !== undefined) player.unmute();
    },
    
    // Changes the channel at cindex
    changeChannel: function (cindex, channel) {
      $this = this;
      Twitch.api({method: 'users/' + channel}, function(error, user){
        if(error){
          console.log(error);
          $('#picker').after('<span class="stream-error"> ' + error.message + '</span>');
          $('.stream-error').fadeOut(1500, function() { $(this).remove(); });
          return;
        }
        $('#stream_'+ cindex).remove();
        $('#chat_'+ cindex).remove();
        $this.addStream(cindex, channel);
        $this.addChat(cindex, channel);
        $(window).resize();
      });
    },
    
    // Adds a new stream in the index slot
    addStream: function (cindex, channel) {
      $('#stream-container_'+cindex).livestream(channel, {
        width: 600,
        height: 400,
        autoPlay: true,
        startVolume: 50,
        cindex: cindex,
        //onLive: function(element, streamer) { },
        //onOffline: function(element, streamer) { }
      });
      $('#stream-container_'+cindex).data('mute', 'false');
    },
    
    // Adds a new chat in the index slot
    addChat: function (cindex, channel) {
      $('#chat-container').append('<iframe width="300px" height="100%" id="chat_'
        +cindex+'" scrolling="no" frameborder="0" '+
        'src="http://www.twitch.tv/chat/embed?channel='+channel+'&popout_chat=true"></iframe>');
    },
    
    // Hides the chat box with animation
    toggleChat: function () {
      var speed = 1000;
      if($('#header').css('right') === '0px') {
        $('#chat-container').animate({ width: '300px'}, speed);
        $('#header,#content,#footer').animate({right: '300px'}, speed);
      } else {
        $('#chat-container').animate({ width: '0'}, speed);
        $('#header,#content,#footer').animate({right: '0'}, speed);
      }
      window.setTimeout(function() {
        $('#chat-toggle-right').toggle();
        $('#chat-toggle-left').toggle();
        $(window).resize();
      }, speed);
    }
  };
}());