/* Ticker.js

Beginnings of the RSM Web Ticker Software rewritten in Node for super fun.

*/

// Learning as I go so there will be stupid shit in here.


var http = require('http');

// Give me my API Function
var GD = require('./api_data.js');

/*
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('RSMWeb Ticker\n');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
*/

// Make Call for ticker / rsm
GD.grab_data("ticker", "rsm");