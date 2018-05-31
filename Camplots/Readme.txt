Road map to this demo

Purpose: Provide a native HTML5 demo of an application that can connect to an application web site, download the software and data, edit offline, then reconnect and update the server.
	This demo has no server database, persistence is simulated with session storage.

The application is cached using a Javascript service worker.

GitHub repository:  https://github.com/rolandwales10/OfflineWebDemo

Parts:
BusinessAreaLayer: this is a shell of the repository pattern.  It is used to retrieve and update data in memory.  (This demo is designed to run without the need for a database
	on the server).
Controllers/sitesController
	This covers the main menu
	Checkout - demos check out capability.  Downloads data to the browser on the client.
	getAll - Retrieve data from the server for offline processing.
	Checkin - menu for updating the server with offline changes.
	CheckUpdatesBackIn - Synchronizes offline data to the server.
	Index - This is used to generate a list of sites from data on the server.
	IndexOffline - This is used to generate a list of sites from offline storage.
Reuse of Razor generated html
	Razor generated html is usable offline for the most part.  For table displays, the @foreach will fail without a model.  The solution is to
	wrap it with an @if statement using a ViewBag or other variable, only executing it for online use.
Scripts
	App - application specific scripts
	CustomUtility - generic scripts usable as is by other apps.
	DBScripts - scripts for IndexedDb.  For the most part, these are usable by other apps.
Caching of software
	Software caching is done through a Javascript service worker.  Cache manifest code is commented out. Cache manifest is officially depreciated, but Apple's IOS
	doesn't support service workers yet.
	The service worker is registered in Scripts/App/HomeBase.js.  AppCacheSW.js is the service worker at the root of the project.
	Cache manifest code is in this app in the event a browser doesn't support service workers.  To use cache manifest, Views/Shared/_layout.cshtml has the <html manifest="@Url.Action("Index","Manifest")"> statement, 
	which must be uncommented to use the cache manifest. The manifest itself is in the Manifest controller.

Instructions for using the demo:
	1) On the home page, click "Sites menu".  The sites menu demos the lifecyle of checkout, offline updates, and checking back in.
	2) Click "checkout from server", then click Download.  You should see messages indicating that 5 records were downloaded.
	3) Return to the sites menu and click "maintain site data offline".
	4) Click "get list".  You should see the 5 sites with locations.
	5) Click Edit for any one of the sites.  You should see an edit screen.
	6) Update a location, save, and go back to the list.
	7) Go back to the menu.
	8) Click "check back into the server", then upload.
	9) Return to the menu and click "validate results on the server".  You should see the sites with any changes you made offline.

Running the app offline:
	If you are familiar with MVC request routing, you know that you can enter the root URL for the application, and MVC will add
	/Home/Index for the default controller and action.  When you run offline, there is no routing.  Be sure to include the 
	/Home/Index at the end of the URL when running the application offline.	
