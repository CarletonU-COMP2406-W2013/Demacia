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

AccountProvider.prototype.save = function(account, callback) {
    this.getCollection(function(error, account_collection) {
     	if( error ) callback(error)
    	else {
        	account_collection.insert(account);
    	} 
    });
};

exports.AccountProvider = AccountProvider;

