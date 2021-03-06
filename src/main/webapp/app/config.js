/**
 * Created by wyc on 14/11/7.
 */
serverLocation = window.location.origin;
PRM.constant('PRMconf',
    {
        MONGOQUERY: serverLocation + '/pims/v1/service/',
        DEFAULT_PAGE_SIZE: 10,
        isNullOrEmptyOrUndefined: function (value) {
            return !value;
        },
        by: function (name, minor) {
            return function (o, p) {
                var a, b;
                if (o && p && typeof o === 'object' && typeof p === 'object') {
                    a = o[name];
                    b = p[name];
                    if (a === b) {
                        return typeof minor === 'function' ? minor(o, p) : 0;
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                } else {
                    throw("error");
                }
            }
        }
    });

