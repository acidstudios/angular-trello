angular-trello
==================

[![Build Status](https://travis-ci.org/acidstudios/angular-trello.png)](https://travis-ci.org/acidstudios/angular-trello) 
[![Dependency Status](https://david-dm.org/acidstudios/angular-trello.png)](https://david-dm.org/acidstudios/angular-trello) 
[![Dev Dependency Status](https://david-dm.org/acidstudios/angular-trello/dev-status.png)](https://david-dm.org/acidstudios/angular-trello#info=devDependencies&view=table) 

> Angular.JS module to handle the Trello Api.

#### Install
```
$ bower install angular-trello
```

#### Usage
```
var app = angular.module('providertest', ['trello']);

			//  Configure the Provider
        	app.config(['TrelloApiProvider', function(TrelloApiProvider) {
        		TrelloApiProvider.init({
        			key: 'YOUR_KEY',
        			secret: 'YOUR_SECRET',
        			scopes: {read: true, write: true, account: true},
        			AppName: 'Angular-Trello Test'
        		});
        	}]);

        	// Use into the Controllers
        	app.controller('TestCtrl', ['$scope', 'TrelloApi', function($scope, TrelloApi){
        		$scope.boards = [];
        		$scope.test = function () {
        			TrelloApi.Authenticate().then(function(){
        				alert(TrelloApi.Token());
        			}, function(){
        				alert('no');
        			});
        		};

        		$scope.getMe = function () {
        			TrelloApi.Rest('GET', 'members/me').then(function(res){
        				$scope.boards = res.idBoards;
        				alert(res);
        			}, function(err){
        				alert(err);
        			});
        		};

        		$scope.getBoards = function() {
        			TrelloApi.boards($scope.boards[0], {}).then(function(res) {
        				alert(res);
        			}, function(err) {
        				alert(err);
        			});
        		};
        	}]);
```

#### Credits
Gustavo Barrientos Guerrero <gustavo.barrientos@acidstudios.me>
