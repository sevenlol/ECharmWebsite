(function() {
    'use strict';

    angular.module('app.blog')
        .filter('trustHtmlFilter', ['$sce', function($sce){
            return function(text) {
                if (!text || !angular.isString(text)) {
                    return text;
                }

                return $sce.trustAsHtml(text);
            };
        }]);

})();
