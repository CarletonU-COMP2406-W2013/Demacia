/*
Livestream jQuery Plugin
Author: Francis Lavoie
Version: 0.3

Modeled from the original version found at: https://github.com/aldehir/jquery-livestream

Changes: 
- Stream will be displayed even if offline.
- Removed queue functionality; wasn't required or helpful for my implementation.
- Renamed callback function to onLive and onOffline respectively as they now serve
  different purposes.
- Changed the ID for the object and added an index option for the ID.
- Uses the Kraken API instead of the deprecated justin.tv API.
- Added enable_javascript to the flashvars to allow ExternalInterface calls.
*/
(function($) {

  // LiveStream class
  var LiveStream = function(element, streamers, options) {
    this.baseUrl = "https://api.twitch.tv/kraken/streams/";
    this.element = $(element);
    this.streamers = streamers;
    this.options = $.extend({}, this.defaults, options);
    this.requestStreamer();
  };

  // LiveStream instance variables and methods
  LiveStream.prototype = {
    // Defaults
    defaults: {
      startVolume: 25,
      autoPlay: true,
      width: 620,
      height: 378,
      cindex: 1,
      onLive: function(element, streamer) { },
      onOffline: function(element, streamer) { }
    },

    // Send an AJAX request to find if the streamer currently streaming.
    requestStreamer: function() {
      // Get the streamer from the queue
      var streamer = this.streamers;
      var streamUrl = this.baseUrl + streamer;

      // Build the embed code and replace the element's contents with it.
      var embedCode = this.buildEmbedCode(streamer);
      this.element.html(embedCode);

      // Ajax call
      var $this = this;
      $.ajax({
        url: streamUrl,
        dataType: 'jsonp',
        jsonp: 'jsonp',

        success: function(resp) {
          // If the response is empty, streamer is offline.
          if(resp.length > 0) {
            $this.options.onLive($this.element, streamer);
          } else {
            $this.options.onOffline($this.element, streamer);
          }
        },

        error: function(resp) {
          // Call onOffline callback function
          $this.options.onOffline($this.element, streamer);
        }

      });
    },

    // Build the embed code for the given streamer
    buildEmbedCode: function(streamer) {
      // Build the flash object
      var object = $('<object/>', {
        type: 'application/x-shockwave-flash',
        id: 'stream_' + this.options.cindex
      });

      // Specifying these attributes in the hash above does some magical jQuery
      // stuff that we don't want.
      object.attr('height', this.options.height);
      object.attr('width', this.options.width);
      object.attr('data', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + streamer);

      // Add in the parameters
      object.append($('<param/>', { name: 'allowFullScreen', value: 'true' }));
      object.append($('<param/>', { name: 'allowScriptAccess', value: 'always' }));
      object.append($('<param/>', { name: 'allowNetworking', value: 'all' }));
      object.append($('<param/>', { name: 'movie', value: 'http://www.twitch.tv/widgets/live_embed_player.swf' }));
      object.append($('<param/>', {
        name: 'flashvars',
        value: $.param({
          hostname: 'www.twitch.tv',
          channel: streamer,
          enable_javascript: 'true',
          auto_play: this.options.autoPlay ? 'true' : 'false',
          start_volume: this.options.startVolume
        })
      }));

      return object;
    }
  };

  $.fn.livestream = function(streamers, options) {
    this.each(function() {
      new LiveStream(this, streamers, options);
    });
    return this;
  };

})(jQuery);