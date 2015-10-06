(function () {
    'use strict';

    angular
        .module('<%= appName %>')
        .config(config);

    function config($stateProvider, $patternsProvider) {

        $patternsProvider
            .registerPattern(
            {
                name:'patterns'
            }
        );
        
        $stateProvider
            .state('patterns', {
                url: "/",
                template: '<pattern pname="patterns"></pattern>'
            }
        )
    }

})();