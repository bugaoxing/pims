PRM.controller('NavController', ['$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log',
    function ($uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log) {

        $scope.changeTheme = function (Theme) {
            $rootScope.bodyTheme = Theme;

        };

        $scope.logout = function(){
            $rootScope.logged=false;
            $rootScope.isRegister=false;
            $rootScope.login={};
        };

        $scope.returnReg = function(){
            $rootScope.logged=false;
            $rootScope.isRegister=true;
            $rootScope.login.id="";
        };


    }]);
