// create a web server that listens on port 3000
// when a request is made to the server, send the contents of the comments.json file to the client

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "application/json"});

  fs.readFile("comments.json", "utf8", function(err, data) {
    if (err) {
      console.log("Error reading file");
    } else {
      response.write(data);
      response.end();
    }
  });
});

// Listen on port 3000, IP defaults to