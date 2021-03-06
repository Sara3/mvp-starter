var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var Twit = require('twit');

var app = express();

var T = new Twit({
    consumer_key:         '', 
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  ''
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
			//AllTweets (function(input) {
				// for(let i = 0; i < input.length; i++) {
				// 	saveInDb(input[i]);


			//	console.log('input ->'  ,input.length);
				// }
			//});

		}
	});
	//console.log('req.body----->',req.body.Body);
	//res.end('got the get')
});



var saveInDb = function (tweet) {
		var tweetObj = {};
		tweetObj.text =  tweet.text;
		tweetObj.date = tweet.created_at;
		var tweet = new items.Item(tweetObj);
		tweet.save(function (err, tweet) {
		if(err) return console.error(err);
			console.log('saved in DB');
		});
	}
// get data from twitter API
// var getTweets = function() {
// 	var options = {
// 		screen_name: 'realDonaldTrump',
// 		count: 200

// 	};
// 	T.get('statuses/user_timeline', options, function(err, data) {
// 		if(err) {console.error(err)};
// 		for(var i = 0; i < 5; i++) {
// 			var tweetObj = {};
// 			tweetObj.text =  data[i].text;
// 			tweetObj.date = data[i].created_at;

// 			var tweet = new items.Item(tweetObj);

// 			tweet.save(function (err, tweet) {
// 				if(err) return console.error(err);
// 				//console.log('saved the tweets in db: ', tweet);

// 			});
			
// 		}
// 	});	
// }


var async = require('async');
var whilst = require('async/whilst');

var AllTweets = function (done) {
        var count = 0;
        var tweets;
        var max_id = -1;
        var name = 'realDonaldTrump';
        //this.timeout(30000);
        T.get("statuses/user_timeline", { screen_name: name, count: 200}, function (err, data, response)
        {
            console.log('Tweets from @' + name);
            printTweets(data);

            max_id = data[data.length - 1].id_str;
            async.whilst(function () {return max_id;}, function (callback)
            {
                T.get("statuses/user_timeline", { screen_name: name, count: 200, max_id: max_id}, function (err, data, response)
                {
                    printTweets(data);
                    if (data.length > 1)
                    {
                        max_id = data[data.length-1].id_str;
                    }
                    else
                    {
                        max_id = 0;
                    }
                    callback();
                });
            }, function (err) {
                console.log("all done\n" + "Tweets: " + count);
                done(data);
            });
            function printTweets(data)
            {
            for (var i = 0; i < data.length; i++)
            {
            	saveInDb(data[i]);

				        console.log(count + ' ' + data[i].text);
                count++;
            }
            }
        });
    };




AllTweets (function(input) {
				for(let i = 0; i < input.length; i++) {
					saveInDb(input[i]);
				}
			});











app.listen(3000, function() {
  console.log('listening on port 3000!');
});

