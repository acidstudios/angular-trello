/**
* angular-trello Module
*
*
*/
	var options = {
		key: null,
		type: 'popup',
		name: null,
		persist: true,
		interactive: true,
		scope: {read: true, write: false, account: false},
		expiration: 'never'
	};

	angular.module('trello', []).
	provider('TrelloApi', [function () {
		this.init = function (custom) {
			if (!custom.key) {
				throw new Error('You must specify your trello app key');
			}
			angular.extend(options, custom);
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

			NTrello.prototype.Authenticated = function() {
				return Trello.authorized();
			};

			NTrello.prototype.Authenticate = function(custom) {
				custom = custom || {};

				var deferred = $q.defer();
				var params = angular.copy(options);
				if (custom.interactive) {
					params.interactive = true;
				}
				Trello.authorize(angular.extend(params, {
					success :function () {
						deferred.resolve();
					},
					error: function() {
						deferred.reject();
					}
				}));
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
			
			NTrello.prototype.addCard = function(params){
				var defered = $q.defer();
				if(typeof params === 'string') {
					Trello.addCard({url: params});
					defered.resolve({response: 'OK'});
				} else if(typeof params === 'object') {
					Trello.addCard(params);
					defered.resolve({response: 'OK'});
				} else {
					defered.reject({error: 1, response: 'Type must be string or object.'});
				}
				return defered.promise;
			}

			return new NTrello();
		}];
	}]).run([function(){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'https://api.trello.com/1/client.js?key=' + options.key;
		var s = document.getElementsByTagName('script')[0];
		s && s.parentNode.insertBefore(script, s);
	}]);