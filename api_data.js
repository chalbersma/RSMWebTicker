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


