var http = require('http'),
	request = require('request'),
	async = require('async'),
	fs = require('fs'),
	port = 8787;

//Make sure to run node temperature.js to serve temp and light sensor mocks
var serviceRootUrl = 'http://localhost:8686';

http.createServer(function(req, res){
	console.log('New request...');

	if(req.url === '/log'){
		async.parallel([getTemperature, getLight],
			function(err, results){
				console.log(results);

				var logEntry = 'Temperature: ' + results[0] + ' Light: ' + results[1];

				fs.appendFile('log.txt', logEntry + '\n', encoding = 'utf8',
					function(err){
						if(err) throw err;
						res.writeHeader(200, {"Content-Type" : "text/plain"});
						res.write(logEntry);
						res.end();
					})
			}
			
		);
	} else{
		res.writeHeader(200, {"Content-Type" : "text/plain"});
		res.write('Please use /log');
		res.end();
	}
}).listen(port);
console.log('Server listening on port ' + port);

function getTemperature(callback){
	request({url: serviceRootUrl + '/temperature', json: true},
		function(err, res, body){
			if(err) callback(err);

			if(res && res.statusCode === 200){
				console.log(body);
				var temp = body.temperature;

				callback(null, temp);
			} else{
				callback(null, null);
			}
		});
}

function getLight(callback){
	console.log('Getting light..');

	request({url: serviceRootUrl + '/light', json: true},
		function(err, res, body){
			if(err) callback(err);

			if(res && res.statusCode === 200){
				console.log(body);
				var light = body.light;

				callback(null, light);
			} else{
				callback(null, null);
			}
		});
}