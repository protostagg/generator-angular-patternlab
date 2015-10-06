(function () {
    'use strict';

    angular
        .module('<%= appName %>')
        .controller("PatternsController", PatternsController);

    function PatternsController() {

        this.patternTitle = "<%= appName %>";

    }

})();