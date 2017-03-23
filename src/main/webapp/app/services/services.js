'use strict';
//restful service

PRM.factory('QueryToolService', ['$resource', 'PRMconf', function ($resource, config) {
    return $resource('', {}, {
        'getAllPerson':{
            url:config.MONGOQUERY + 'queryAll',
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
            url:config.MONGOQUERY + 'addPerson',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'deletePerson':{
            url:config.MONGOQUERY + 'deletePerson',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        }
    });
}]);







