var express = require('express');
var useragent = require('useragent');
var app = express();

var PORT = process.env.PORT || 3000;

app.get('/', function (req,res) {
	  var agent = useragent.parse(req.headers['user-agent']);
	  var ipAddr = req.headers["x-forwarded-for"];
	  if (ipAddr){
	    var list = ipAddr.split(",");
	    ipAddr = list[list.length-1];
	  } else {
	    ipAddr = req.connection.remoteAddress;
	  }

	  res.json({
	    ip: ipAddr,
	    "language": req.headers['accept-language'].split(',')[0],
	    OS: agent.os.family
	  });
});

app.listen(PORT, function () {
	console.log('Express Started on port ' + PORT);
});	