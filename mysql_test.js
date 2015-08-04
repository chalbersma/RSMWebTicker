// MySQL Connection Test
// Requires npm install mysql

var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'nodeuser',
	password: 'nodeuser',
	database: 'node_test',
});

connection.connect();

connection.query('SELECT * from node_test.record', function(err, rows, fields) {
	if (!err)
		console.log('Rows Returned is: ', rows);
	else
		console.log('Error while performing the Query.');
});

connection.end();

