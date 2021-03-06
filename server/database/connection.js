var mysql = require('mysql');
var express = require("express");

// Database connection
const db = mysql.createConnection({
	host: "localhost",
	user: 'root',
	password: '',
	database: 'todo'
});

db.connect(function (err) {
	if (err) {
		console.log('DB Error');
		throw err;
	} else {
		console.log('Connect');
	}
});


module.exports = db;
