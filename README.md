# MMM-Sounds2
Based on [MMM-Sounds](https://github.com/jc21/MMM-Sounds) but rather than playing the sound locally it gets played in browser for those who host their MagicMirror on a separate server.

**NOTE:** Chrome blocks the autoplay of sounds until you interact with the site. Adding --autoplay-policy=no-user-gesture-required should do the trick, here is how I launch mine on my pi.

chromium-browser --noerrdialogs --autoplay-policy=no-user-gesture-required --kiosk --incognito https://dash.url.com

## Module Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/sigel/MMM-Sounds2.git`


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

````javascript
modules: [
	{
		module: 'MMM-Sounds2',
		config: {
			startupSound:	true,	// Play sound on startup
			alertSound:	true,	// Play alert sound when alert module is triggered
			quietTimeStart:	'23:00',	// 11pm
			quietTimeEnd:	'07:00'	// 7am
		}
	}
]
````

## Configuration options

The following properties can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>startupSound</code></td>
			<td>Play sound after module startup<br>
				<br><b>Possible values:</b> <code>boolean</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>alertSound</code></td>
			<td>Play sound for alert module<br>
				<br><b>Possible values:</b> <code>boolean</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>defaultDelay</code></td>
			<td>The default delay before playing the file in milliseconds<br>
				<br><b>Possible values:</b> <code>integer</code>
				<br><b>Default value:</b> <code>10</code>
			</td>
		</tr>
		<tr>
			<td><code>quietTimeStart</code></td>
			<td>The 24 hour and minute start of Quiet time<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>null</code>
			</td>
		</tr>
		<tr>
			<td><code>quietTimeEnd</code></td>
			<td>The  24 hour and minute end of Quiet time<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>null</code>
			</td>
		</tr>
		<tr>
			<td><code>debug</code></td>
			<td>Enable to display more debug messages in console<br>
				<br><b>Possible values:</b> <code>bool</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
	</tbody>
</table>


## Quiet Times

This module supports *not* playing sounds during a quiet time, if BOTH the `quietTimeStart` and `quietTimeEnd` config
options are specified.

The values for these times are HH:mm and must be in 24 hour format. Examples:

- `00:30` - 12:30am
- `06:30` - 6:30am
- `14:11` - 2:11pm
- `23:30` - 11:30pm


## Telling the module to play sounds from another module

From another module you can tell this module to play a sound in 2 ways:

In your module:

```javascript
self.sendNotification('PLAY_ALERT', 'alert');
```

or also specifying a delay:

```javascript
self.sendNotification('PLAY_ALERT', {sound: 'alert', delay: 1000}); // 1 second delay
```


## Included sounds

- `alert`
- `announcement`
- `bells`
- `chord`
- `notify`
- `startup`
- `synth`
