/* Grab API Data */

module.exports.grab_data = function grab_data(req_type, req_target){
	var http = require('http');
	var writer = require('./write_index_example.js');
	
	api_url = "http://api.796.com/v3/stock/" + req_type + ".html?type=" + req_target ;
	console.log("Grabbing API Data: " + api_url);
	var request = http.get(api_url, function(response) {
		// Data Streaming so Data "Event"
		// See this Stackoverflow : http://stackoverflow.com/questions/16148403/using-node-js-to-connect-to-a-rest-api
		var buffer = "",
			data,
			route;
			
		response.on("data", function(chunk) {
			buffer += chunk;
		});
		
		response.on("end", function (err) {
			// finished transferring data
			// dump the raw data
			console.log(buffer);
			console.log("\n");
			data = JSON.parse(buffer);
			console.log(data);
			// extract the distance and time
			//console.log("Walking Distance: " + route.legs[0].distance.text);
			//console.log("Time: " + route.legs[0].duration.text);
			writer.write_index(data);
		}); 
	}); 
};

module.exports.grab_data_simple = function grab_data_simple(req_type, req_target){
	// Does the same thing as grab_data did but will return the result instead of calling a function.
	// Not sutible for eventing then but usfule as a building block for other events.
	var http = require('http');
	api_url = "http://api.796.com/v3/stock/" + req_type + ".html?type=" + req_target ;
        console.log("Grabbing API Data: " + api_url);
	// Delcare 3 Variables
        var buffer = "",
		data,
		route;
	// I think response is provided by the require('http'); line above
	response.on("data", function(chunk) {
		buffer += chunk;
	});
	response.on("end", function (err) {
		// finished transferring data
		// dump the raw data
		console.log(buffer);
		console.log("\n");	
		data = JSON.parse(buffer);
		console.log(data);
		// extract the distance and time
		//console.log("Walking Distance: " + route.legs[0].distance.text);
		//console.log("Time: " + route.legs[0].duration.text);
		writer.write_index(data);
                }
	);
};

