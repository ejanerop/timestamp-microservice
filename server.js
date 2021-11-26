// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function(req, res) {
  var resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});

app.get("/api/:date?", function (req, res) {
  var date = req.params.date;
  if (!date) {
    let dateObj = new Date();
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  } else if (!isNaN(date)) {
    let unix = parseInt(date);
    let utc = new Date(unix).toUTCString();
    res.json({
      unix,
      utc
    });
  } else {
    let dateObj = new Date(date);
    if (dateObj.toString() === 'Invalid Date') {
      res.json({
        error: 'Invalid Date'
      });
    } else {
      var unix = dateObj.getTime();
      var utc = dateObj.toUTCString();
      res.json({
        unix: unix,
        utc:utc
      });
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
