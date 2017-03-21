'use strict';

/* Filters */

PRM.filter('dateCheck', ["$filter", function ($filter) {
    return function (obj) {
        var type = typeof obj;
        if (type.toString() == "number") {
            if (obj > 1000000000000) {
                var newDate = new Date(obj);
                var returnValue = $filter('date')(newDate, 'yyyy-MM-dd HH:mm:ss');
                return returnValue;
            } else {
                return obj;
            }
        } else {
            return obj;
        }

    };
}]);

PRM.filter('timeago', function () {
    return function (date) {
        return moment(date).fromNow();
    };
})
PRM.filter('calendar', function () {
    return function (date) {
        return moment(date).calendar();
    };
});

