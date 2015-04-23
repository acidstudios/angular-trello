var options = {};

/**
* angular-trello Module
*
*
*/
angular.module('trello', []).
provider('TrelloApi', [function () {
	options.key = null;
	this.SetKey = function (key) {
		options.key = key;
		return this;
	};

	this.GetKey = function () {
		return options.key;
	};

	options.secret = null;
	this.SetSecret = function (secret) {
		options.secret = secret;
		return this;
	};

	this.GetSecret = function () {
		return options.secret;
	};

	this.init = function (custom) {
		angular.extend(options, custom);
	};

	options.scopes = {read: true, write: false, account: false};
	this.SetScopes = function (scopes) {
		options.scopes = scopes;
		return this;
	};

	this.GetScopes = function () {
		return options.scopes;
	};

	options.AppName = null;
	this.SetAppName = function (appname) {
		options.AppName = appname;
		return this;
	};

	this.GetAppName = function () {
		return options.AppName;
	};

	options.expiration = 'never';
	this.SetExpiration = function (duration){
		options.expiration = duration;
		return this;
	};

	this.GetExpiration = function() {
		return options.expiration;
	};

	this.$get = ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {
		var NTrello = function () {};

		var collectionQuery = function(prop, id, params){
			var deferred = $q.defer();
			Trello[prop].get(id, params, function(response){
				deferred.resolve(response);
			}, function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		};

		NTrello.prototype.Authenticate = function() {
			var deferred = $q.defer();
			Trello.authorize({
				type: 'popup',
				name: options.AppName,
				scope: options.scopes,
				expiration: options.expiration,
				success :function () {
					deferred.resolve();
				},
				error: function() {
					deferred.reject();
				}
			});
			return deferred.promise;
		};

		NTrello.prototype.Rest = function(method, path, params) {
			var deferred = $q.defer();
			Trello.rest(method, path, params, function(response){
				deferred.resolve(response);
			}, function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		};

		NTrello.prototype.Token = function() {
			return Trello.token();
		};

		NTrello.prototype.actions = function(id, params) {
			return collectionQuery("actions", id, params);
		};

		NTrello.prototype.boards = function(id, params) {
			return collectionQuery("boards", id, params);
		};

		NTrello.prototype.cards = function(id, params) {
			return collectionQuery("cards", id, params);
		};

		NTrello.prototype.checklists = function(id, params) {
			return collectionQuery("checklists", id, params);
		};

		NTrello.prototype.lists = function(id, params) {
			return collectionQuery("lists", id, params);
		};

		NTrello.prototype.members = function(id, params) {
			return collectionQuery("members", id, params);
		};

		NTrello.prototype.organizations = function(id, params) {
			return collectionQuery("organizations", id, params);
		};

		return new NTrello();
	}];
}]).run([function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
  	script.async = true;
  	script.src = 'https://api.trello.com/1/client.js?key=' + options.key;
  	var s = document.getElementsByTagName('script')[0];
  	s.parentNode.insertBefore(script, s);
}]);
