/**
* angular-trello Module
*
*
*/
(function (Trello) {
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

			NTrello.prototype.Authenticate = function() {
				var deferred = $q.defer();
				Trello.authorize(angular.extend(options, {
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

			return new NTrello();
		}];
	}]);
})(Trello);
