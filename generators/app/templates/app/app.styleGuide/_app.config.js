(function () {
    'use strict';

    angular
        .module('<%= appName %>')
        .config(config);

    function config($urlRouterProvider) {
        $urlRouterProvider
            .otherwise("/");
    }

})();