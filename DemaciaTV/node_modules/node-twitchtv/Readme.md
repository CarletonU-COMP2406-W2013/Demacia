
# node-twitchtv

  TwitchTV client for Node applications.
  
  ![Build Status](https://travis-ci.org/jbueza/node-twitchtv.png)
  
  
## Getting started

- Sign up for an application (need a client_id) at TwitchTV: http://www.twitch.tv/settings?section=applications

```
npm install node-twitchtv
```

Then integrate!

```javascript

var TwitchClient = require("node-twitchtv");

// { client_id: "generatedClientId", scope: "user_read, channel_read_"}

var account = require("../secrets/user.json");

var client = new TwitchClient(account);
  
client.games({ limit: 20, offset: 21 }, function(err, games) {
  console.log(games);
});
```

## Retrieving a list of games

```javascript
client.games({ channel: "nl_kripp" }, function(err, channel) {
  console.log(channel.info); // channel info/description
});
```

## Retrieving a channel's information

```javascript
client.channels({ channel: "nl_kripp" }, function(err, channel) {
  console.log(channel.info); // channel info/description
});
```

## Retrieving a user's information

```javascript
client.users({ user: "nl_kripp" }, function(err, user) {
  console.log(user.name); // user info!
});
```

## Contributing

100% open -- let's make this better! Accepting pull requests at any time.

### Running the tests

```
λ node-twitchtv (master): npm test
```

## TODO

* OAuth2 authentication 
* Being able to update channel information
* Listing videos
* Searching
* Pushing streams

## License 

(The MIT License)

Copyright (c) 2012 Jaime Bueza &lt;jbueza@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.