/*! angular-trello 2015-04-27 */
/**
* angular-trello Module
*
*
*/
(function(a) {
    var b = {
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
            angular.extend(b, a);
        };
        this.$get = [ "$q", "$rootScope", "$timeout", function(c, d, e) {
            var f = function() {};
            var g = function(b, d, e) {
                var f = c.defer();
                a[b].get(d, e, function(a) {
                    f.resolve(a);
                }, function(a) {
                    f.reject(a);
                });
                return f.promise;
            };
            f.prototype.Authenticate = function() {
                var d = c.defer();
                a.authorize(angular.extend(b, {
                    success: function() {
                        d.resolve();
                    },
                    error: function() {
                        d.reject();
                    }
                }));
                return d.promise;
            };
            f.prototype.Rest = function(b, d, e) {
                var f = c.defer();
                a.rest(b, d, e, function(a) {
                    f.resolve(a);
                }, function(a) {
                    f.reject(a);
                });
                return f.promise;
            };
            f.prototype.Token = function() {
                return a.token();
            };
            f.prototype.actions = function(a, b) {
                return g("actions", a, b);
            };
            f.prototype.boards = function(a, b) {
                return g("boards", a, b);
            };
            f.prototype.cards = function(a, b) {
                return g("cards", a, b);
            };
            f.prototype.checklists = function(a, b) {
                return g("checklists", a, b);
            };
            f.prototype.lists = function(a, b) {
                return g("lists", a, b);
            };
            f.prototype.members = function(a, b) {
                return g("members", a, b);
            };
            f.prototype.organizations = function(a, b) {
                return g("organizations", a, b);
            };
            return new f();
        } ];
    } ]);
})(Trello);