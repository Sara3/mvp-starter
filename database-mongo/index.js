var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  date: {type: Date},// number of tweets
  text: {type: String, unique: true}
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


var findTweets = function(input, callback) {
  var query = {
    'text' : new RegExp(input, 'i')
  };

   Item.find( query, function(err,docs) { 
      if(err) {
        callback(err, null);
      } else {
          callback(null, docs);
           console.log('docs------->',docs)
      }
    }
  );
}


module.exports = {
  selectAll: selectAll,
  Item: Item,
  findTweets: findTweets
};