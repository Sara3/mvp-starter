var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var Twit = require('twit');

var app = express();

var T = new Twit({
    consumer_key:         'HSyoyPFq7J3MfDN2bX6N2Rc5s', 
    consumer_secret:      'IyyjXeGu49uzVH7TGVrZZaFBkbv5wI2qPbeTBmdNdLPmCzvH2P',
    access_token:         '287196747-fkoW52vBr0f4AWEQm0J1mhOyUHJalMTBk62IAtB6',
    access_token_secret:  'aH45yUcbl4DhW3T90C0SZPp9hGCaHpNpmy9bZD6RcC4NV'
})



app.use(bodyParser());
app.use(express.static(__dirname + '/../react-client/dist'));



app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
    	res.json(data);
      //res.json(data);
     // getTweets();
    }
  });
});



app.post('/items', function(req, res) {
	let input = req.body.Body; 
	items.findTweets(input, function (err, data) {
		if(err) {
			return res.sendStatus(500);
		} else {
			res.json(data);
			console.log('recieved data',data);
		}
	});
	//console.log('req.body----->',req.body.Body);
	//res.end('got the get')
});





// get data from twitter API
var getTweets = function() {
	var options = {
		screen_name: 'realDonaldTrump',
		count: 200

	};

	T.get('statuses/user_timeline', options, function(err, data) {
		if(err) {console.error(err)};
		for(var i = 0; i < 5; i++) {
			var tweetObj = {};
			tweetObj.text =  data[i].text;
			tweetObj.date = data[i].created_at;

			var tweet = new items.Item(tweetObj);

			tweet.save(function (err, tweet) {
				if(err) return console.error(err);
				//console.log('saved the tweets in db: ', tweet);
			});
			
		}
	});	

}



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

