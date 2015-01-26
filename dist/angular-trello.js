/*! angular-trello 2015-01-23 */
var options = {};

/**
* angular-trello Module
*
* 
*/
angular.module("trello", []).provider("TrelloApi", [ function() {
    options.key = null;
    this.SetKey = function(a) {
        options.key = a;
        return this;
    };
    this.GetKey = function() {
        return options.key;
    };
    options.secret = null;
    this.SetSecret = function(a) {
        options.secret = a;
        return this;
    };
    this.GetSecret = function() {
        return options.secret;
    };
    this.init = function(a) {
        angular.extend(options, a);
    };
    options.scopes = {
        read: true,
        write: false,
        account: false
    };
    this.SetScopes = function(a) {
        options.scopes = a;
        return this;
    };
    this.GetScopes = function() {
        return options.scopes;
    };
    options.AppName = null;
    this.SetAppName = function(a) {
        options.AppName = a;
        return this;
    };
    this.GetAppName = function() {
        return options.AppName;
    };
    this.$get = [ "$q", "$rootScope", "$timeout", function(a, b, c) {
        var d;
        var e = function() {};
        var f = function(b, c, e) {
            d = a.defer();
            Trello[b].get(c, e, function(a) {
                d.resolve(a);
            }, function(a) {
                d.reject(a);
            });
            return d.promise;
        };
        e.prototype.Authenticate = function() {
            d = a.defer();
            Trello.authorize({
                type: "popup",
                name: options.AppName,
                scope: options.scopes,
                success: function() {
                    d.resolve();
                },
                error: function() {
                    d.reject();
                }
            });
            return d.promise;
        };
        e.prototype.Rest = function(b, c, e) {
            d = a.defer();
            Trello.rest(b, c, e, function(a) {
                d.resolve(a);
            }, function(a) {
                d.reject(a);
            });
            return d.promise;
        };
        e.prototype.Token = function() {
            return Trello.token();
        };
        e.prototype.actions = function(a, b) {
            return f("actions", a, b);
        };
        e.prototype.boards = function(a, b) {
            return f("boards", a, b);
        };
        e.prototype.cards = function(a, b) {
            return f("cards", a, b);
        };
        e.prototype.checklists = function(a, b) {
            return f("checklists", a, b);
        };
        e.prototype.lists = function(a, b) {
            return f("lists", a, b);
        };
        e.prototype.members = function(a, b) {
            return f("members", a, b);
        };
        e.prototype.organizations = function(a, b) {
            return f("organizations", a, b);
        };
        return new e();
    } ];
} ]).run([ function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://api.trello.com/1/client.js?key=" + options.key;
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
} ]);