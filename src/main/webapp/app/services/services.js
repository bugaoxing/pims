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
        'queryAllMajors':{
            url:config.MONGOQUERY + 'queryAllMajors',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'queryAllSchedule':{
            url:config.MONGOQUERY + 'queryAllSchedule',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'queryScheduleById':{
            url:config.MONGOQUERY + 'queryScheduleById',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'queryAllCourse':{
            url:config.MONGOQUERY + 'queryAllCourse',
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
        'addPersons':{
            url:config.MONGOQUERY + 'addPersons',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addSchedule':{
            url:config.MONGOQUERY + 'addSchedule',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addCourses':{
            url:config.MONGOQUERY + 'addCourses',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addMajors':{
            url:config.MONGOQUERY + 'addMajors',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'addPerson':{
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
        },
        'queryScheduleByKeyValue':{
            url:config.MONGOQUERY + 'queryScheduleByKeyValue',
            method: 'GET',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'deleteCourses':{
            url:config.MONGOQUERY + 'deleteCourse',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'register':{
            url:config.MONGOQUERY + 'register',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        },
        'login':{
            url:config.MONGOQUERY + 'login',
            method: 'POST',
            headers: {'Content-Type': "application/json;charset=utf-8"},
            isArray: false,
            cache: false
        }
    });
}]);







