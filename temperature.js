var http = require("http");
var port = 8686;

function randomInt(low, high){
	return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req, res){
	console.log('New incoming request for url ' + req.url);

	res.writeHeader(200, {'Content-Type' : 'application/json'});

	switch(req.url){
		case '/temperature':
			res.write('{"temperature" : '+ randomInt(1, 40) + '}');
			break;
		case '/light':
			res.write('{"light" : '+ randomInt(1, 100) + '}');		
			break;
		default:
			res.write('{"error" : "invalid url"}')	
	}	

	res.end();

}).listen(port);

console.log('Server started: http://localhost:' + port);