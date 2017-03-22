'use strict';
//restful service

PRM.factory('QueryToolService', ['$resource', 'PRMconf', function ($resource, config) {
    return $resource('', {}, {
        'getAllPerson':{
            url:config.MONGOQUERY + 'getAllPerson',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'secretMatching':{
            url:config.MONGOQUERY + 'secretMatching',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addOrUpdatePersonInfo':{
            url:config.MONGOQUERY + 'addOrUpdatePersonInfo',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'deletePerson':{
            url:config.MONGOQUERY + 'deletePerson',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        }
    });
}]);







