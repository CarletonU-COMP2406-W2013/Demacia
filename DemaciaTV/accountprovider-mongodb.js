var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

AccountProvider = function(host, port) {
  this.db = new Db('DemaciaTV', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

AccountProvider.prototype.getCollection = function(callback){
  this.db.collection('accounts', function(error, account_collection){
    if(error) callback(error);
    else callback (null, account_collection);
  });
};

AccountProvider.prototype.clearData = function(callback){
  this.getCollection(function(error, account_collection){
      if(error) callback(error);
      else{
        account_collection.remove();
      }
  });
};

AccountProvider.prototype.findAll = function(callback){
  this.getCollection(function(error, account_collection){
    if(error) callback(error);
    else{
      account_collection.find().toArray(function(error, results){
        if(error) callback(error);
        else callback(null, results);
      });
    }
  });
};

AccountProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, account_collection) {
    if( error ) callback(error);
    else {
      account_collection.findOne({_id: account_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if( error ) callback(error);
        else callback(null, result);
      });
    }
  });
};

AccountProvider.prototype.findByName = function(n, callback) {
  this.getCollection(function(error, account_collection) {
    if( error ) callback(error);
    else {
      
      account_collection.findOne({name: n}, function(error, result) {
        if( error ) callback(error);
        else callback(null, result);
      });
    }
  });
};

// Only adds a new user if there are none with this name already.
AccountProvider.prototype.newUser = function(account, callback) {
  var that = this;
  that.getCollection(function(error, account_collection) {
    if( error ) callback(error)
    else {
      that.findByName(account.name, function(error, result){
        if(result === null){
          account_collection.insert(account);
        }
      });
    }
  });
};

AccountProvider.prototype.startWatching = function(n, channel, callback) {
  this.getCollection(function(error, account_collection) {
    if( error ) callback(error);
    else {
      var modifier = { $set: {} };
      modifier.$set['session.'+channel] = {startTime: Date.now()};
      console.log(modifier);
      account_collection.update({name: n}, modifier);
    }
  });
}

AccountProvider.prototype.stopWatching = function(n, channel, callback) {
  var that = this;
  this.getCollection(function(error, account_collection) {
    if( error ) callback(error);
    else {
      that.findByName(n, function(error, result) {
        if(result.session.hasOwnProperty(channel)) {
          var timeElapsed = Date.now() - result.session[channel].startTime;
          console.log('Time watched for ' + channel + ': ' + timeElapsed + 'ms');

          var totalViewCount = 1, totalViewTime = timeElapsed;
          if(result.hasOwnProperty('history')){
            if(result.history.hasOwnProperty(channel)){
              totalViewCount += result.history[channel].viewCount;
              totalViewTime += result.history[channel].viewTime;
            }
          }
          var modifier = { $set: {}, $unset: {} };
          modifier.$set['history.'+channel] = {viewTime: totalViewTime, viewCount: totalViewCount};
          modifier.$unset['session.'+channel] = "";
          console.log(modifier);
          
          account_collection.update({name: n}, modifier);
        }
      });
    }
  });
}

AccountProvider.prototype.stopWatchingAll = function(n, callback) {
  var that = this;
  this.getCollection(function(error, account_collection) {
    if( error ) callback(error);
    else {
      that.findByName(n, function(error, result) {
        for(var stream in result.session) {
          if (result.session.hasOwnProperty(stream)) {
            that.stopWatching(n, stream);
          }
        }
      });
    }
  });
}

exports.AccountProvider = AccountProvider;