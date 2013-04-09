# Extensions
- Help Menu 
    - Popup menu on hotkey "H", using a modal jQuery UI popup. The hotkey can easily be implemented using the jquery.hotkeys plugin.
- More account-related functionality
    - We could pull the TwitchTV channels the user follows with the API and display them in the navigation as a list of which the they can choose from 
    - Make user specific pages for a user to view their statistics by clicking on their username in the app.
    - Display User's history as a list in the stream navigation so they can watch streams they've watched in the past.
- Searching streams will display results in the sidebar browser
    - We're not sure if the Twitch API allows for search strings and returning a list of streams matching that string. Our design of the sidebar can support displaying a list of streams, though the implementation depends on how searching for streams is implemented in the Twitch API.
- Interface inprovements
    - Pre-set layouts for more or less streams organized in a specific manner. We would let the user choose a specific layout (dropdown box and/or hotkeys) and the GUI would automatically update itself to support that configuration of streams. We only have one layout right now: four quadrants.
    - Allow the user to resize streams on their own on the fly and allow them to change the depth of a stream (for example picture in picture, with a smaller stream always on top of another).
    - Options to allow for persistency between viewing sessions if logged in
        - Remember the preferred layout.
        - Always open with favourite streamers.
    - More hotkey integration
        - Navigation is missing hotkey functionality to load streams using the keyboard only.
        - Giving focus to the chat area text field or leaving it with a hotkey.
        - Add hotkey functionality to the new features outlined in this document as needed.

We would also implement as many features as we could that the public requests. We got many suggestions when we showed our beta version of the app to the public [here on Reddit](http://www.reddit.com/r/leagueoflegends/comments/1at5v9/i_built_a_multistream_viewer_currently_in_beta/).
