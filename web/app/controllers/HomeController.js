PRM.controller('HomeController', ['$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log',
    function ($uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log) {

        //Default page name
        $scope.pageName = "PersonalEditor";
        $scope.changeLanding = function (pageName) {
            $scope.pageName = pageName;
            $rootScope.pageTitle = pageName;
        };


        $scope.landingUrl = function () {
            return 'app/partials/' + $scope.pageName + '.html';
        };



        /*
         Functions
         */

    }]);
