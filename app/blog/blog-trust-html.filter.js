(function() {
    'use strict';

    angular.module('app.blog')
        .filter('trustHtmlFilter', ['$sce', function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }]);

})();
