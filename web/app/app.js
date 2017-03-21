/*
 Definition of:
 # Global Variables
 # Prototype class overwrite
 */
GOLABLE_PORT = window.location.port;

//Array remove and insert method
Array.prototype.remove = function (index) {
    if (index >= 0 && index < this.length) {
        var part1 = this.slice(0, index);
        var part2 = this.slice(index);
        part1.pop();
        return (part1.concat(part2));
    }
    return this;
};
Array.prototype.insert = function (index, value) {
    if (index < 0) {
        index = this.length;
    }
    var part1 = this.slice(0, index);
    var part2 = this.slice(index);
    part1.push(value);
    return (part1.concat(part2));
};

function unescape(html, $sanitize) {
    if (!html) return '';
    html = html.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace();
    return $sanitize ? $sanitize(html) : html;
}


// declare top-level module which depends on filters,and services
var PRM = angular.module('pims',
    [
        'ngCookies',
        'ngResource',
        'ui.bootstrap',
        'ngSanitize',
        'darthwade.loading',
        'ngDragDrop',
        'ngTable',
        'notyModule',
        'ngAnimate',
        'ui.comments'
    ]);



// bootstrap angular
PRM.config(['$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {


    $httpProvider.interceptors.push(function($q) {
        var realEncodeURIComponent = window.encodeURIComponent;
        return {
            'request': function(config) {
                window.encodeURIComponent = function(input) {
                    return realEncodeURIComponent(input).split("%2F").join("/");
                };
                return config || $q.when(config);
            },
            'response': function(config) {
                window.encodeURIComponent = realEncodeURIComponent;
                return config || $q.when(config);
            }
        };
    });

    //$httpProvider.interceptors.push('sessionInjector');


}]);

// this is run after angular is instantiated and bootstrapped
PRM.run(function ($rootScope, $location, $http, $timeout, PRMconf) {

    // *****
    // Initialize authentication
    // *****
    //console.log("Get Cookie value: " + $cookieStore.get("MBIPTheme"));
    $rootScope.bodyTheme = "MainPage-body-Kiwi";
    $rootScope.teamName = "Jaguar";
    $rootScope.teamVersion = "2017-Release-1";
    //console.log("myTheme value: " + $rootScope.myTheme);
    $rootScope.language_value = "en";
    //$rootScope.postBoardNotifier = new NotificationManager($rootScope);
    //$rootScope.ProjcetName = PRMconf.PROJECT_NAME;
    $rootScope.pageTitle="TroubleShooter";
    $rootScope.myself={};
    $rootScope.responseUsersByManager = [];
    $rootScope.domainRootInfo = [];

    $rootScope.trEndDate = new Date();
    $rootScope.trStartDate = new Date(new Date().getTime()-24*60*60*1000);
    $rootScope.caldt = new Date();


    // text input for login/password (only)
    //$rootScope.loginInput = !$cookieStore.get('userName') ? "" : $cookieStore.get('userName');
    $rootScope.passwordInput = '';



});