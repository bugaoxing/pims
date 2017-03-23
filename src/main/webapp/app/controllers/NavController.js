PRM.controller('NavController', ['$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log',
    function ($uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log) {

        $scope.changeTheme = function (Theme) {
            $rootScope.bodyTheme = Theme;

        };


    }]);
