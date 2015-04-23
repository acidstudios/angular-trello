/*! angular-trello 2015-04-23 */
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
    options.expiration = "never";
    this.SetExpiration = function(a) {
        options.expiration = a;
        return this;
    };
    this.GetExpiration = function() {
        return options.expiration;
    };
    this.$get = [ "$q", "$rootScope", "$timeout", function(a, b, c) {
        var d = function() {};
        var e = function(b, c, d) {
            var e = a.defer();
            Trello[b].get(c, d, function(a) {
                e.resolve(a);
            }, function(a) {
                e.reject(a);
            });
            return e.promise;
        };
        d.prototype.Authenticate = function() {
            var b = a.defer();
            Trello.authorize({
                type: "popup",
                name: options.AppName,
                scope: options.scopes,
                expiration: options.expiration,
                success: function() {
                    b.resolve();
                },
                error: function() {
                    b.reject();
                }
            });
            return b.promise;
        };
        d.prototype.Rest = function(b, c, d) {
            var e = a.defer();
            Trello.rest(b, c, d, function(a) {
                e.resolve(a);
            }, function(a) {
                e.reject(a);
            });
            return e.promise;
        };
        d.prototype.Token = function() {
            return Trello.token();
        };
        d.prototype.actions = function(a, b) {
            return e("actions", a, b);
        };
        d.prototype.boards = function(a, b) {
            return e("boards", a, b);
        };
        d.prototype.cards = function(a, b) {
            return e("cards", a, b);
        };
        d.prototype.checklists = function(a, b) {
            return e("checklists", a, b);
        };
        d.prototype.lists = function(a, b) {
            return e("lists", a, b);
        };
        d.prototype.members = function(a, b) {
            return e("members", a, b);
        };
        d.prototype.organizations = function(a, b) {
            return e("organizations", a, b);
        };
        return new d();
    } ];
} ]).run([ function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://api.trello.com/1/client.js?key=" + options.key;
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
} ]);