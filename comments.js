// create a web server that listens on port 3000
// The server should respond to a GET request to /comments with an array of comments
// The server should respond to a POST request to /comments with a new comment added to the array
// The server should respond with a 404 to any other requests
// The server should respond with a 500 if there is an error
// The server should respond with a 200 if the request was successful
// The server should respond with a 201 if the comment was created successfully

// Comments array
var comments = [];

// Require the http module
var http = require('http');
// Require the url module
var url = require('url');
// Require the querystring module
var querystring = require('querystring');

// Create the server
var server = http.createServer(function(req, res) {
  // Get the URL
  var urlParts = url.parse(req.url);
  var path = urlParts.pathname;
  var query = querystring.parse(urlParts.query);

  // Check if the path is comments
  if (path === '/comments') {
    if (req.method === 'GET') {
      // Send back the comments array
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(comments));
    } else if (req.method === 'POST') {
      // Get the data from the request
      var data = '';
      req.on('data', function(chunk) {
        data += chunk;
      });
      req.on('end', function() {
        // Parse the data
        var comment = JSON.parse(data);
        // Add the comment to the comments array
        comments.push(comment);
        // Send back a 201
        res.writeHead(201);
        res.end();
      });
    } else {
      // Send back a 404
      res.writeHead(404);
      res.end();
    }
  } else {
    // Send back a 404
    res.writeHead(404);
    res.end();
  }
});

// Listen on port 3000
server.listen(3000);
console.log('Server listening on port 3000');