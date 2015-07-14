(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorListController', askdoctorListController);

    askdoctorListController.$inject = [
        'myAccount',
        '$stateParams',
        'askdoctorCategoryList',
        'questionList',
        'doctorList',
        'userList'
    ];

    function askdoctorListController(myAccount, $stateParams, askdoctorCategoryList, questionList, doctorList, userList) {
        var SHOW_MORE_QUESTION_STEP = 1;

        var vm = this;

        vm.categoryList = askdoctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';

        vm.isCollapsed = true;
        vm.collapse = collapse;

        vm.pageLimit = 1;
        vm.index = 0;
        vm.numOfQuestions = countNumberOfQuestions(questionList);
        vm.displayShowMoreButton = vm.numOfQuestions > vm.pageLimit ? true : false;
        vm.showMoreQuestion  = showMoreQuestion;

        vm.searchText = '';
        vm.updatedSearchText = '';
        vm.search = search;

        // TODO add state variables for askQuestion function
        // merge doctorList, userList, categoryList to questionList
        vm.questionList = mergeQuestionList(questionList, doctorList, userList, askdoctorCategoryList);
        vm.collapseQuestion = collapseQuestion;
        vm.askQuestion = askQuestion;

        /* public functions */

        function askQuestion() {
            // body...
        }

        // FIXME remove this
        function collapse() {
            vm.isCollapsed = !vm.isCollapsed;
        }

        function collapseQuestion(index) {
            if (!angular.isNumber(index)) {
                return;
            }

            if (!vm.questionList || !angular.isArray(vm.questionList) ||
                vm.questionList.length - 1 < index || index < 0) {
                return;
            }

            vm.questionList[index].isExpanded = !vm.questionList[index].isExpanded;
        }

        function showMoreQuestion() {
            if (!vm.numOfQuestions) {
                return;
            }

            if (vm.index + vm.pageLimit + SHOW_MORE_QUESTION_STEP >= vm.numOfQuestions) {
                vm.pageLimit = vm.numOfQuestions;
                vm.displayShowMoreButton = false;
            } else {
                vm.displayShowMoreButton = true;
                vm.pageLimit += SHOW_MORE_QUESTION_STEP;
            }
        }

        function search(searchText) {
            vm.updatedSearchText = searchText;
        }

        /* private functions */

        function countNumberOfQuestions(questionList) {
            if (!questionList || !angular.isArray(questionList)) {
                return 0;
            }

            return questionList.length;
        }

        function mergeQuestionList(questionList, doctorList, userList, categoryList) {
            if (!questionList || !angular.isArray(questionList) || questionList.length === 0) {
                return null;
            }

            // add categoryName to doctorList
            if (doctorList && angular.isArray(doctorList) && doctorList.length > 0 &&
                categoryList && angular.isArray(categoryList) && categoryList.length > 0) {

                for (var i in doctorList) {
                    if (!doctorList[i]) {
                        continue;
                    }

                    for (var j in categoryList) {
                        if (!categoryList) {
                            continue;
                        }

                        if (doctorList[i].user_info && doctorList[i].user_info.category === categoryList[j].name) {
                            doctorList[i].user_info.categoryName = categoryList[j].text;
                            break;
                        }
                    }
                }
            }

            for (var i in questionList) {

                if (!questionList[i] || !angular.isObject(questionList[i])) {
                    continue;
                }

                if (doctorList && angular.isArray(doctorList) && doctorList.length > 0 &&
                    questionList[i].answer && angular.isObject(questionList[i].answer)) {

                    for (var j in doctorList) {
                        if (!doctorList[j]) {
                            continue;
                        }

                        if (questionList[i].answer.answerer_id === doctorList[j].account_id) {
                            questionList[i].doctor = doctorList[j];
                            break;
                        }
                    }
                }

                if (userList && angular.isArray(userList) && userList.length > 0) {

                    for (var j in userList) {
                        if (!userList[j]) {
                            continue;
                        }

                        if (questionList[i].questioner_id === userList[j].account_id) {
                            questionList[i].user = userList[j];
                            break;
                        }
                    }
                }

                if (categoryList && angular.isArray(categoryList) && categoryList.length > 0) {

                    for (var j in categoryList) {
                        if (!categoryList[j]) {
                            continue;
                        }

                        if (questionList[i].category === categoryList[j].name) {
                            questionList[i].categoryName = categoryList.text;
                            break;
                        }
                    }
                }

                // set isCollapsed
                questionList[i].isExpanded = false;
            }

            return questionList;
        }

    }

})();
