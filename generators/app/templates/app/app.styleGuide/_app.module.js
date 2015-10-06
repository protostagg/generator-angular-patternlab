(function () {
    'use strict';

    angular
        .module('<%= appName %>',
        [
            'ui.router',
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngJSONPath',
            'patterns.router'
        ]
    )
    .run(function($patterns){

        $patterns.finalizeHierarchy()

    })

})();