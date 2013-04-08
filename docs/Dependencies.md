# Dependencies
## Socket.IO
We used socket to allow for fully duplex TCP connectivity between the client and server. This allows us to easily have event-driven code on both the client and server, and send data back and forth without having to do messy ajax calls. The primary use for it currently is to track usage statistics in our app, for example how long a user has watched a particular stream, and how many times they have opened that stream.

Socket.IO was released under the MIT license.
## Connect
Connect is middleware for Node that takes care of many common server-side functionalities that Node does not implement on it’s own.

Connect was released under the MIT license.
## Express
Express is a web app framework. We used it to help us structure our app and to simplify the amount of work we needed to do to get our app up and running.

Express was released under the MIT license.
## Jade
Jade is an HTML templating engine. We used it to quickly mock up pages that display user data and to structure the general parts of our main app web page.

Jade was released under the MIT license.
## Stylus
Stylus is a language and parser that simplifies the writing of CSS. It made it much easier to write dynamic CSS for our site as needed.

Stylus was released under the MIT license.
## MongoDB
MongoDB is a document database. We used it to store persistent user data like usage history.

MongoDB was released under the Creative Commons license.
## jQuery
jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

We used jQuery to animate certain UI elements as well as to manipulate the DOM in various ways as needed.

jQuery was released under the MIT license.
## [jquery.hotkeys](https://github.com/tzuryby/jquery.hotkeys)
Small jQuery plugin to allow for easier use of hotkeys. Sets up event-driven callbacks when a specific key or key combination is pressed. We used it to make quick use of our app a breeze.

A license was not specified, but it is assumed to be the MIT license as it’s a jQuery plugin.
## [jquery.livestream](https://github.com/aldehir/jquery-livestream)
Small jQuery plugin to allow for easy embedding of TwitchTV stream objects. This plugin was heavily modified by us for our own purposes. It originally had features we didn’t want or need, but it simplified what we already had by quite a bit and made it easier for us to embed stream objects in our app.

A license was not specified, but it is assumed to be the MIT license as it’s a jQuery plugin.
## [TwitchTV JS SDK](https://github.com/justintv/twitch-js-sdk)
The Twitch JavaScript SDK provides rich functionality for accessing the Twitch API. This includes Twitch Connect, which allows users to log in with their Twitch accounts into our app.

We use this extensively to call the TwitchTV API to get data about the currently live streams and for getting data about the user who is connected to our app.

No license was specified. 
