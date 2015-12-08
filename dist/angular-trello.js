/*! angular-trello 2015-12-08 */
/**
* angular-trello Module
*
*
*/
var options = {
    key: null,
    type: "popup",
    name: null,
    persist: true,
    interactive: true,
    scope: {
        read: true,
        write: false,
        account: false
    },
    expiration: "never"
};

angular.module("trello", []).provider("TrelloApi", [ function() {
    this.init = function(a) {
        if (!a.key) {
            throw new Error("You must specify your trello app key");
        }
        angular.extend(options, a);
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
        d.prototype.Authenticated = function() {
            return Trello.authorized();
        };
        d.prototype.Authenticate = function(b) {
            b = b || {};
            var c = a.defer();
            var d = angular.copy(options);
            if (b.interactive) {
                d.interactive = true;
            }
            Trello.authorize(angular.extend(d, {
                success: function() {
                    c.resolve();
                },
                error: function() {
                    c.reject();
                }
            }));
            return c.promise;
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
    b && b.parentNode.insertBefore(a, b);
} ]);