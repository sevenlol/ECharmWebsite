(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorListController', askdoctorListController);

    askdoctorListController.$inject = [
        'myAccount',
        '$stateParams',
        '$rootScope',
        'askdoctorCategoryList',
        'questionList',
        'myQuestionList',
        'doctorList',
        'userList',
        'askdoctorQuestionService'
    ];

    function askdoctorListController(myAccount, $stateParams, $rootScope, askdoctorCategoryList, questionList, myQuestionList, doctorList, userList, askdoctorQuestionService) {
        var SHOW_MORE_QUESTION_STEP = 1;

        var vm = this;

        vm.categoryList = askdoctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.categoryName = getCategoryName(askdoctorCategoryList, vm.category);

        vm.isCollapsed = true;
        vm.collapse = collapse;

        vm.pageLimit = 1;
        vm.index = 0;
        vm.numOfQuestions = countNumberOfQuestions(questionList);
        vm.showMoreQuestion  = showMoreQuestion;

        vm.searchText = '';
        vm.updatedSearchText = '';
        vm.search = search;

        // ask question form
        vm.questionMin = 10;
        vm.questionSubmitted = false;
        // FIXME change this to a better solution
        vm.askQuestionCategory = vm.category === 'all' ? askdoctorCategoryList[1].name : vm.category;
        vm.statusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        // TODO add state variables for askQuestion function
        // merge doctorList, userList, categoryList to questionList
        vm.questionList = mergeQuestionList(questionList, doctorList, userList, askdoctorCategoryList);
        vm.questionList = mergeMyQuestionList(vm.questionList, myQuestionList, askdoctorCategoryList, myAccount);
        vm.collapseQuestion = collapseQuestion;
        vm.askQuestion = askQuestion;

        /* public functions */

        function askQuestion() {
            vm.questionSubmitted = true;
            vm.statusMessage.isShown = false;

            // invalid question text
            if (vm.questionForm.questionText.$invalid) {
                return;
            }

            if (!askdoctorQuestionService || !$rootScope || !$rootScope.authenticated ||
                !myAccount || !myAccount.account_id) {
                askQuestionFailed('提問時發生錯誤，請稍後重試');
            }

            // TODO change these
            var questionBody = {
                questioner_id : myAccount.account_id,
                title : 'title', // not used atm
                image_arr : [],
                tag_arr : [],
                rating : 0,
                rating_count : 0,
                created_at : new Date().toString(),
                updated_at : new Date().toString(),
                content_text : vm.questionText
            };

            // callbacks
            var askQuestionSuccessCallback = function(question) {
                // TODO add handling code
                // create failed
                if (!question) {
                    askQuestionFailed('提問時發生錯誤，請稍後重試');
                    return;
                }

                askQuestionSucceeded('提問發表成功');
                // created succeeded
            };

            var askQuestionFailCallback = function(error) {
                if (error && error.message) {
                    askQuestionFailed(error.message);
                    return;
                }

                askQuestionFailed('提問時發生錯誤，請稍後重試');
            };

            try {
                askdoctorQuestionService
                    .createQuestion(vm.askQuestionCategory, questionBody)
                    .then(askQuestionSuccessCallback)
                    .catch(askQuestionFailCallback);
            } catch (e) {
                askQuestionFailed('提問時發生錯誤，請稍後重試');
            }
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
            } else {
                vm.pageLimit += SHOW_MORE_QUESTION_STEP;
            }
        }

        function search(searchText) {
            vm.updatedSearchText = searchText;
            vm.index = 0;
            vm.pageLimit = 1;
        }

        /* private functions */

        function askQuestionFailed(msg) {
            vm.questionSubmitted = false;
            vm.statusMessage.isShown = true;
            vm.statusMessage.type = 'error';
            vm.statusMessage.message = msg;
        }

        function askQuestionSucceeded(msg) {
            vm.questionSubmitted = false;
            vm.statusMessage.isShown = true;
            vm.statusMessage.type = 'success';
            vm.statusMessage.message = msg;
        }

        function countNumberOfQuestions(questionList) {
            if (!questionList || !angular.isArray(questionList)) {
                return 0;
            }

            return questionList.length;
        }

        function getCategoryName(categoryList, category) {
            if (!categoryList || !angular.isArray(categoryList) || categoryList === 0) {
                return '';
            }

            if (!category) {
                return '';
            }

            for (var i in categoryList) {
                if (!categoryList[i]) {
                    continue;
                }

                if (categoryList[i].name === category) {
                    return categoryList[i].text;
                }
            }

            return '';
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

        function mergeMyQuestionList(questionList, myQuestionList, categoryList, myAccount) {
            if (!myQuestionList || !angular.isArray(myQuestionList) || myQuestionList.length === 0) {
                return questionList;
            }

            if (!questionList || !angular.isArray(questionList) || questionList.length === 0) {
                return myQuestionList;
            }

            var myQuestionIndexList = [];
            for (var i in myQuestionList) {
                if (!myQuestionList[i]) {
                    continue;
                }

                var isExist = false;

                for (var j in questionList) {
                    if (!questionList[j]) {
                        continue;
                    }

                    if (questionList[j].question_id === myQuestionList[i].question_id) {
                        isExist = true;
                        break;
                    }
                }

                // this question not exit, add to questionList
                if (!isExist) {

                    // add myAccount
                    myQuestionList[i].user = myAccount;

                    // get category name
                    if (categoryList && angular.isArray(categoryList) && categoryList.length > 0) {

                        for (var j in categoryList) {
                            if (!categoryList[j]) {
                                continue;
                            }

                            if (myQuestionList[i].category === categoryList[j].name) {
                                myQuestionList[i].categoryName = categoryList.text;
                                break;
                            }
                        }
                    }

                    // save index
                    myQuestionIndexList.push(i);
                }
            }

            // merge myQuestionList to questionList
            if (myQuestionIndexList.length > 0) {
                for (var i in myQuestionIndexList) {
                    var index = myQuestionIndexList[i];
                    questionList.push(myQuestionList[index]);
                }
            }
        }
    }

})();
