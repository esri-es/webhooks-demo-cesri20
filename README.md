# Webhooks Demo #CEsri20

We finally have [Webhooks](https://developers.arcgis.com/rest/users-groups-and-items/create-webhooks.htm) also supported on hosted feature services! ^_^

This is a short tutorial on how to reproduce the [same demo](https://studio.youtube.com/channel/UCtOKtU_kXqz5ZlJ_-OJc_dw/videos/upload?d=ud&filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D) we did at the Developer's Week during the Esri Spain User Conference in 2020.

[![Demo Webhooks on Hosted Feature Services - ArcGIS Online](https://user-images.githubusercontent.com/826965/95022980-b35e2380-067a-11eb-9999-c69a3d13bc7c.gif)
](https://youtu.be/P83UPqVIOAw)

> **Requirements**:  you need to have installed: Git, NodeJS and ngrok in your computer

##  Tutorial

To reproduce this example:

1. Run this script:
	* Clone this repo: `https://github.com/esri-es/webhooks-demo-cesri20.git`
	* Install dependencies: `npm i`
	* Run: `node index.js`

2. Run `grok http 127.0.0.1:3000` in a different terminar

3. Setup your Webhook
	* Create a [new Hosted Feature Layer](https://developers.arcgis.com/layers/new)
	* Click "View in ArcGIS Online" > "Settings", and check "Keep track of created and updated features"
	* Get a token from: https://developers.arcgis.com/dashboard
	* Get your service URL, add "admin/" between "rest" and "services" and also add at the the "?token=\<YOUR TOKEN\>"
	* Click on "Web Hooks" (bottom right) > "Create" and add
		* Change types: *
		* HookURL: <your ngrok url, something like https://ba3d5b9bf39c.ngrok.io>
		* Click create

Now you are ready to test it:

* Open the [Web Map Viewer](http://www.arcgis.com/apps/mapviewer/index.html)
* Sign in
* Load the feature layer
* Do some edits
* And wait until you start seeing messages in your console ^_^

# Known limitations

This script do not support secured services but contributions are always welcome. We would suggest to use [arcgis-rest-js](https://github.com/Esri/arcgis-rest-js) to make it easy.

# Additional resources

* [Webhooks documentation](https://developers.arcgis.com/rest/users-groups-and-items/create-webhooks.htm)
* [ArcGIS Online: Best Practices with Hosted Feature Services](https://www.youtube.com/watch?v=pp5GP2_xFeo&feature=youtu.be&t=4923) (video)

# Questions, enhancements & bugs

Use the [issues](https://github.com/esri-es/webhooks-demo-cesri20/issues) to ask/report anything you want.
