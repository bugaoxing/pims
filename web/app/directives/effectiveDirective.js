PRM.directive('fadeIn', function () {
    return {
        compile: function (elm) {
            $(elm).css('opacity', 0.0);
            return function (scope, elm, attrs) {
                $(elm).animate({ opacity: 1.0 }, 1500);
            };
        }
    };
});

PRM.directive('loadingContainer', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var loadingLayer = angular.element('<div class="loading"></div>');
            element.append(loadingLayer);
            element.addClass('loading-container');
            scope.$watch(attrs.loadingContainer, function(value) {
                loadingLayer.toggleClass('ng-hide', !value);
            });
        }
    };
});

PRM.directive('noty', function () {

    return {
        restrict:'A',

        link: function (scope, element, attr) {

            // set notification (noty) defaults on global scope
            var opts = {
                layout: 'centerRight',
                theme: 'nucleusTheme',
                dismissQueue: true, // If you want to use queue feature set this true
                template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 250 // opening & closing animation speed
                },
                timeout: 3000, // delay for closing event. Set false for sticky notifications
                force: false, // adds notification to the beginning of queue when set to true
                modal: false,
                maxVisible: 5, // you can set max visible notification for dismissQueue true option
                closeWith: ['click'], // ['click', 'button', 'hover']
                callback: {
                    onShow: function() {},
                    afterShow: function() {},
                    onClose: function() {},
                    afterClose: function() {}
                },
                buttons: false // an array of buttons
            };

            var index = scope.$index;
            var notification = scope.notifications[index];
            var text = notification['text'];
            var type = notification['type'];

            opts.text = text;
            opts.type = type;

            // errors persist on screen longer
            if (type == 'error') {
                opts.timeout = 55000;
            }

            notification['processed'] = true;

            noty(opts);
        }
    }
});


PRM.directive('dlEnterKey', function() {
    return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                scope.$apply(function() {
                    // Evaluate the expression
                    scope.$eval(attrs.dlEnterKey);
                });

                event.preventDefault();
            }
        });
    };
});
