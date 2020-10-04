# WebHooks Demo #CEsri20

We finally have [Webhooks](https://developers.arcgis.com/rest/users-groups-and-items/create-webhooks.htm) also supported on hosted feature services! ^_^

This is a short tutorial on how to reproduce the same demo we did at the Developer's Week during the Esri Spain User Conference in 2020.

> **Requirements**:  you need to have installed: Git, NodeJS and ngrok in your computer

##  Tutorial

To reproduce this example:

1. Run this script:
	1.1 Clone this repo: `https://github.com/esri-es/webhooks-demo-cesri20.git`
	1.2 Install dependencies: `npm i`
	1.3 Run: `node index.js`

2. Run `grok http 127.0.0.1:3000` in a different terminar

3. Setup your Webhook
	2.1 Create a [new Hosted Feature Layer](https://developers.arcgis.com/layers/new)
	2.2 Click "View in ArcGIS Online" > "Settings", and check "Keep track of created and updated features"
	2.3 Get a token from: https://developers.arcgis.com/dashboard
	2.4 Get your service URL, add "admin/" between "rest" and "services" and also add at the the "?token=<YOUR TOKEN>"
	2.5 Click on "Web Hooks" (bottom right) > "Create" and add
		* Change types: *
		* HookURL: <your ngrok url, something like https://ba3d5b9bf39c.ngrok.io>
		* Click create

Now you are ready to test it:

* Open the [Web Map Viewer](http://www.arcgis.com/apps/mapviewer/index.html)
* Sign in
* Load the feature layer
* Do some edits
* And wait until you start seeing messages in your console ^_^
