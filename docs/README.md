# DemaciaTV 
## Project Members
### Francis Lavoie - 100819112
### Mark Murillo - 100835344

## Documentation
### [Dependencies](https://github.com/CarletonU-COMP2406-W2013/Demacia/blob/master/docs/Dependencies.md)
### [Files](https://github.com/CarletonU-COMP2406-W2013/Demacia/blob/master/docs/Files.md)
### [Motivation](https://github.com/CarletonU-COMP2406-W2013/Demacia/blob/master/docs/Motivation.md)

## Application Description
Our web application “DemaciaTV” is a multi-stream browser for TwitchTV. DemaciaTV adds keyboard hotkey functionality for fast stream manipulations (fullscreen modes, mute, hide/show chat/stream browser) which makes viewing multiple streams easy and seamless. The user can browse the different streams by navigating the left sidebar and drag a specific stream to a specific stream container. Alternatively, the user can click on the stream which automatically adds it to the currently focused stream container (containers 1-4).

On a side note, one can view the statistics of each account logged into the application by going directly to the /db-manager page. Although this functionality is not meant for users, it is still interesting to see the different statistics for each account that the application keeps track of. Future implementation will be that the user can only view his statistics by clicking on his name when logged in.

Also note that our app has domain-specific functionality because of how the TwitchTV API is set up. We requested an API key from them which is used when doing API calls. Users cannot properly log into our app unless it is hosted on the domain linked with that API key. The API key listed in our client-side code is linked to the "francislavoie.ca" domain which points to the app hosted locally on my machine. The app should still be accessible at http://francislavoie.ca for at least the month of April and May for reference. Note that I may have developped new features on the web app in the mean time as I mean to continue work on this web app.

## Application Controls
<table>
	<tr>
		<td>Key</td>
		<td>Function</td>
	</tr>
	<tr>
		<td>1</td>
		<td>Give focus to stream #1</td>
	</tr>
	<tr>
		<td>2</td>
		<td>Give focus to stream #2</td>
	</tr>
	<tr>
		<td>3</td>
		<td>Give focus to stream #3</td>
	</tr>
	<tr>
		<td>4</td>
		<td>Give focus to stream #4</td>
	</tr>
	<tr>
		<td>F</td>
		<td>Toggles fullscreen (hides away sidebars and header to make the streams fill the window)</td>
	</tr>
	<tr>
		<td>G</td>
		<td>Makes the currently focused stream fill the streams area</td>
	</tr>
	<tr>
		<td>D</td>
		<td>Deletes the currently focused stream</td>
	</tr>
	<tr>
		<td>Left</td>
		<td>Toggle the navigation sidebar</td>
	</tr>
	<tr>
		<td>Right</td>
		<td>Toggle the chat sidebar</td>
	</tr>
</table>
