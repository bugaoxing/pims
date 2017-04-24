/*
 Definition of:
 # Global Variables
 # Prototype class overwrite
 */

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



}]);

// this is run after angular is instantiated and bootstrapped
PRM.run(function ($rootScope, $location, $http, $timeout, PRMconf) {

    // *****
    // Initialize authentication
    // *****
    $rootScope.login ={
        id:"10000000",
        password:"1234",
        role:"admin"
    };
    $rootScope.role = "";
    $rootScope.isRegister = false;
    $rootScope.logged = false;
    $rootScope.bodyTheme = "MainPage-body-Sunny";
    $rootScope.pageTitle="学生信息管理系统";





});