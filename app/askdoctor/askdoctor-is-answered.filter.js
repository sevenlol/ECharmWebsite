(function() {
    'use strict';

    angular
        .module('app.askdoctor')
        .filter('isAnsweredFilter', isAnsweredFilter);

    function isAnsweredFilter() {
        return function(questionList, isAnswered) {
            if (!isAnswered) {
                return questionList;
            }

            if (!questionList || !angular.isArray(questionList) || questionList.length === 0) {
                return questionList;
            }

            if (isAnswered !=='true' && isAnswered !== 'false') {
                return questionList;
            }

            var outputList = [];

            for (var i in questionList) {
                if (!questionList[i]) {
                    continue;
                }

                if (questionList[i].answer && isAnswered === 'true') {
                    outputList.push(questionList[i]);
                }

                if (!questionList[i].answer && isAnswered === 'false') {
                    outputList.push(questionList[i]);
                }
            }

            return outputList;
        }
    }

})();
