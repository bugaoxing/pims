PRM.controller('NavController', ['$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log',
    function ($uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log) {

        $scope.changeTheme = function (Theme) {
            $rootScope.bodyTheme = Theme;

        };

        // manager select:
        $scope.registerManager = "";
        $scope.registerManagers = [];
        $scope.managerList = [];


        $scope.modelOptions = {
            debounce: {
                default: 200,
                blur: 150
            },
            getterSetter: true
        };
        $scope.changeRegiManager = function (name) {
            $scope.registerManager = name;
        };

        $scope.searchManagerValue = "";

        // Manager select end

        //modal pop up
        var postTaskModal;
        $scope.postTask = function () {
            postTaskModal = $uibModal.open({
                animation: true,
                size: "lg",
                templateUrl: 'app/partials/modals/PostTask.html',
                controller: 'ModalController'

            });

        };


    }]);
