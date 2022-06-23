var http = require('http');

http.createServer(function (req, res) {
  res.write("Beep Boop Stinky");
  res.end();
}).listen(8080);