var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to serve our JavaScript, CSS and index.html
app.use(express.static('./'));

var pusher = new Pusher('04a315eaab1fda938284', {
  cluster: 'ap2'
});
/*var pusher = new Pusher({
app_id = "1036686"
key = "04a315eaab1fda938284"
secret = "fa97ed5cd1ecc1f815d1"
cluster = "ap2"
});*/

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening at http://localhost:5000'));
