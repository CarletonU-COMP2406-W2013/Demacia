# Extensions
- Help Menu 
    - Popup menu on hotkey "H", using a modal jQuery UI popup. The hotkey can easily be implemented using the jquery.hotkeys plugin.
- More account-related functionality
    - We could pull the TwitchTV channels the user follows with the API and display them in the navigation as a list of which the they can choose from 
    - Make user specific pages for a user to view their statistics by clicking on their username in the app.
    - Display User's history as a list in the stream navigation so they can watch streams they've watched in the past.
- Searching streams will display results in the sidebar browser
    - We're not sure if the Twitch API allows for search strings and returning a list of streams matching that string. Our design of the sidebar can support displaying a list of streams, though the implementation depends on how searching for streams is implemented in the Twitch API.
