'use strict';
//restful service

PRM.factory('QueryToolService', ['$resource', 'PRMconf', function ($resource, config) {
    return $resource('', {}, {
        //keyword & searchDate & hosts
        'fetchCalByKeywordAndFeaturePool':{
            url: config.WEBROOTURL + "fetchCalByKeywordAndFeaturePool",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        //pgTrackingId & pool
        'fetchCalByPgTrackingId': {
            url: config.WEBROOTURL + "fetchcalbypgtrackingid",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        //emailAddress & calIds
        'sendMailAndCalInfo': {
            url: config.WEBROOTURL + "sendemail",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        //keyword & searchDate & pool & domain
        'fetchCalByKeyword': {
            url: config.WEBROOTURL + "fetchcalbykeyword",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            //transformResponse: function (data) {return data},
            isArray: false,
            cache: false
        },
        //orderId & pool & domain
        'fetchCalByOrderId': {
            url: config.WEBROOTURL + "fetchcalbyorderId",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            //transformResponse: function (data) {return data},
            isArray: false,
            cache: false
        },

        'fetchPoolList': {
            url: config.WEBROOTURL + "fetchpoollist",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            //transformResponse: function (data) {return data},
            isArray: false,
            cache: false
        },
        //domain
        'fetchPoolsByDomain': {
            url: config.WEBROOTURL + 'fetchpoolsbydomain',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'getAllDomainDetails':{
            url:config.MONGOQUERY + 'getAllDomainDetails',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'secretMatching':{
            url:config.WEBROOTURL + 'secretMatching',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addServers':{
            url:config.MONGOQUERY + 'addServers',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addServerInfo':{
            url:config.WEBROOTURL + 'addServerInfo',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'deleteServer':{
            url:config.WEBROOTURL + 'deleteServer',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        }
    });
}]);


PRM.factory('TestResultService', ['$resource', 'PRMconf', function ($resource, config) {
    return $resource('', {}, {
        //testdomain
        'fetchtestgroup': {
            url: config.WEBROOTURL + "fetchtestgroup",
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        //testdomain & testgroup
        'fetchTestMethods': {
            url:config.WEBROOTURL + "fetchtestmethodbytestgroup",
            method:'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },//testdomain & testgroup & testmethod & startTestDate & endTestDate
        'fetchdatabydaterange': {
            url:config.WEBROOTURL + "fetchdatabydaterange",
            method:'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        //testdomain & startTestDate & endTestDate & testmethod & testgroup
        'fetchpassrate':{
            url:config.WEBROOTURL + "fetchpassrate",
            method:'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        //testdomain & testmethod & testgroup
        'fetchLastSuccess':{
            url:config.WEBROOTURL + "fetchlastsuccess",
            method:'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        }
    });
}]);





