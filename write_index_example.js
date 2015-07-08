/* Write Index (Test Version */

module.exports.write_index = function write_index(js_string){
	var http = require('http');
	console.log("Write Index");
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("RSM Web Ticker: " + JSON.stringify(js_string) + "\n");
	}).listen(8080, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:8080/');
};