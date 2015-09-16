(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorListController', askdoctorListController);

    askdoctorListController.$inject = [
        '$filter',
        'myAccount',
        '$stateParams',
        '$rootScope',
        'askdoctorCategoryList',
        'askdoctorSortOptionList',
        'accountCategoryNameTextList',
        'popularQAList',
        'popularDoctorList',
        'questionList',
        'myQuestionList',
        'doctorList',
        'userList',
        'askdoctorQuestionService'
    ];

    function askdoctorListController(
        $filter,
        myAccount,
        $stateParams,
        $rootScope,
        askdoctorCategoryList,
        askdoctorSortOptionList,
        accountCategoryNameTextList,
        popularQAList,
        popularDoctorList,
        questionList,
        myQuestionList,
        doctorList,
        userList,
        askdoctorQuestionService) {

        var SHOW_MORE_QUESTION_STEP = 5;
        var DATE_FORMAT = 'yyyy-MM-ddTHH:mmZ';
        var DEFAULT_RATING_MAX = 5;
        var MALE_STRING = 'MALE';
        var FEMALE_STRING = 'FEMALE';
        var POPULAR_LIST_LIMIT = {
            QA : 6,
            DOCTOR : 6
        };
        var POPULAR_QA_CONTENT_LENGTH_LIMIT = 20;

        var vm = this;

        vm.myAccount = myAccount;
        vm.GENDER_STRING = {
            MALE : MALE_STRING,
            FEMALE : FEMALE_STRING
        };

        vm.categoryList = askdoctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.categoryName = getCategoryName(askdoctorCategoryList, vm.category);

        // popular list
        vm.popularQAList = parsePopularQAList(popularQAList);
        vm.popularQAContentMaxLength = POPULAR_QA_CONTENT_LENGTH_LIMIT;
        vm.popularDoctorList = parsePopularDoctorList(popularDoctorList);

        vm.sortOptionList = askdoctorSortOptionList;
        vm.currentSortOption = askdoctorSortOptionList ? askdoctorSortOptionList[0].name : 'avgRating';

        vm.isCollapsed = true;
        vm.collapse = collapse;

        // ask question form
        vm.questionMin = 10;
        vm.questionSubmitted = false;
        vm.selectedCategory = vm.category;
        vm.statusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        // TODO add state variables for askQuestion function
        // merge doctorList, userList, categoryList to questionList
        vm.questionList = mergeQuestionList(questionList, doctorList, userList, askdoctorCategoryList, accountCategoryNameTextList);
        vm.questionList = mergeMyQuestionList(vm.questionList, myQuestionList, askdoctorCategoryList, myAccount);
        vm.collapseQuestion = collapseQuestion;
        vm.askQuestion = askQuestion;

        vm.pageLimit = 5;
        vm.index = 0;
        vm.numOfQuestions = countNumberOfQuestions(vm.questionList);
        vm.showMoreQuestion  = showMoreQuestion;
        vm.resetPageParameters = resetPageParameters;

        vm.searchText = '';
        vm.updatedSearchText = '';
        vm.onlyShowUnAnsweredQuestion = false;
        vm.search = search;

        // rating
        vm.ratingMax = DEFAULT_RATING_MAX;

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
                return;
            }

            if (vm.selectedCategory === 'all') {
                askQuestionFailed('請選擇一個問題類別');
                return;
            }

            // TODO change these
            var questionBody = {
                questioner_id : myAccount.account_id,
                title : 'title', // not used atm
                image_arr : [],
                tag_arr : [],
                rating : 0,
                rating_count : 0,
                created_at : $filter('date')(new Date(), DATE_FORMAT),
                updated_at : $filter('date')(new Date(), DATE_FORMAT),
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

                askQuestionSucceeded('提問發表成功', question);
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
                    .createQuestion(vm.selectedCategory, questionBody)
                    .then(askQuestionSuccessCallback)
                    .catch(askQuestionFailCallback);
            } catch (e) {
                askQuestionFailed('提問時發生錯誤，請稍後重試');
            }
        }

        // popular list parse functions

        function parsePopularQAList(qaList) {
            if (!qaList || !angular.isArray(qaList) || qaList.length === 0) {
                return null;
            }

            var row1List = [];
            var row2List = [];
            var parsedQAList = [ row1List, row2List ];
            var count = 0;

            for (var i in qaList) {
                if (!qaList[i]) continue;

                if (i % 2 === 0) {
                    row1List.push(qaList[i]);
                } else {
                    row2List.push(qaList[i]);
                }
                count++;

                if (count >= POPULAR_LIST_LIMIT.QA) break;
            }
            return parsedQAList;
        }

        function parsePopularDoctorList(doctorList) {
            if (!doctorList || !angular.isArray(doctorList) || doctorList.length === 0) {
                return null;
            }

            var count = 0;
            var parsedDoctorList = [];
            for (var i in doctorList) {
                if (!doctorList[i]) continue;

                parsedDoctorList.push(doctorList[i]);
                count++;

                if (count >= POPULAR_LIST_LIMIT.DOCTOR) break;
            }
            return parsedDoctorList;
        }

        // FIXME remove this
        function collapse() {
            vm.isCollapsed = !vm.isCollapsed;
        }

        function collapseQuestion(questionId) {
            if (!questionId || !angular.isString(questionId)) {
                return;
            }

            if (!vm.questionList || !angular.isArray(vm.questionList)) {
                return;
            }

            for (var i in vm.questionList) {
                if (vm.questionList[i].question_id === questionId) {
                    vm.questionList[i].isExpanded = !vm.questionList[i].isExpanded;
                    break;
                }
            }
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
            resetPageParameters();
        }

        function resetPageParameters() {
            vm.index = 0;
            vm.pageLimit = 5;
            if (vm.questionList && angular.isArray(vm.questionList) && vm.questionList.length > 0) {
                for (var i in vm.questionList) {
                    if (vm.questionList[i]) {
                        vm.questionList[i].isExpanded = false;
                    }
                }
            }
        }

        /* private functions */

        function askQuestionFailed(msg) {
            vm.questionSubmitted = false;
            vm.statusMessage.isShown = true;
            vm.statusMessage.type = 'error';
            vm.statusMessage.message = msg;
        }

        function askQuestionSucceeded(msg, question) {
            vm.questionSubmitted = false;
            vm.statusMessage.isShown = true;
            vm.statusMessage.type = 'success';
            vm.statusMessage.message = msg;
            vm.questionText = '';

            if (vm.category !== question.category) {
                return;
            }

            question.isExpanded = false;
            question.user = vm.myAccount;

            if (vm.questionList) {
                vm.questionList.push(question);
                vm.numOfQuestions++;
            } else {
                vm.questionList = [ question ];
                vm.numOfQuestions = 1;
            }
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

        function mergeQuestionList(questionList, doctorList, userList, categoryList, doctorCategoryList) {
            if (!questionList || !angular.isArray(questionList) || questionList.length === 0) {
                return null;
            }

            // add categoryName to doctorList
            if (doctorList && angular.isArray(doctorList) && doctorList.length > 0 &&
                doctorCategoryList && angular.isArray(doctorCategoryList) && doctorCategoryList.length > 0) {

                for (var i in doctorList) {
                    if (!doctorList[i]) {
                        continue;
                    }

                    for (var j in doctorCategoryList) {
                        if (!doctorCategoryList) {
                            continue;
                        }

                        if (doctorList[i].user_info && doctorList[i].user_info.category === doctorCategoryList[j].name) {
                            doctorList[i].user_info.categoryName = doctorCategoryList[j].text;
                            break;
                        }
                    }
                }
            }

            // for sorting
            var oldDate = new Date('1970-01-01');

            for (var i in questionList) {

                if (!questionList[i] || !angular.isObject(questionList[i])) {
                    continue;
                }

                // set for sorting
                if (questionList[i].created_at) {
                    questionList[i].created_date = new Date(questionList[i].created_at);
                } else {
                    questionList[i].created_date = oldDate;
                }
                if (questionList[i].answer && questionList[i].answer.created_at) {
                    questionList[i].answer_date = new Date(questionList[i].answer.created_at);
                } else {
                    questionList[i].answer_date = oldDate;
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

                // calculate comment count
                if (questionList[i].comment_list && angular.isArray(questionList[i].comment_list) && questionList[i].comment_list.length > 0) {
                    questionList[i].commentCount = questionList[i].comment_list.length;
                } else {
                    // set for sorting
                    questionList[i].commentCount = 0;
                }

                // calculate avg rating
                if (questionList[i].rating_list && angular.isArray(questionList[i].rating_list) && questionList[i].rating_list.length > 0) {
                    var total = 0;
                    var count = 0;
                    for (var j in questionList[i].rating_list) {
                        var rating = questionList[i].rating_list[j];
                        if (rating && rating.rating_value && angular.isNumber(rating.rating_value)) {
                            if (rating.rating_value >= 0 && rating.rating_value <= 5) {
                                total += rating.rating_value;
                                count++;
                            }
                        }
                    }

                    if (count > 0) {
                        total /= count;
                    }
                    questionList[i].avgRating = total;
                } else {
                    // set for sorting
                    questionList[i].avgRating = -1;
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
                questionList = [];
            }

            // for sorting
            var oldDate = new Date('1970-01-01');

            var myQuestionIndexList = [];
            for (var i in myQuestionList) {
                if (!myQuestionList[i]) {
                    continue;
                }

                // set for sorting
                if (myQuestionList[i].created_at) {
                    myQuestionList[i].created_date = new Date(myQuestionList[i].created_at);
                } else {
                    myQuestionList[i].created_date = oldDate;
                }
                if (myQuestionList[i].answer && myQuestionList[i].answer.created_at) {
                    myQuestionList[i].answer_date = new Date(myQuestionList[i].answer.created_at);
                } else {
                    myQuestionList[i].answer_date = oldDate;
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

                    // set isCollapsed
                    myQuestionList[i].isExpanded = false;

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

                    // calculate comment count
                    if (myQuestionList[i].comment_list && angular.isArray(myQuestionList[i].comment_list) && myQuestionList[i].comment_list.length > 0) {
                        myQuestionList[i].commentCount = myQuestionList[i].comment_list.length;
                    } else {
                        // set for sorting
                        myQuestionList[i].commentCount = 0;
                    }

                    // calculate avg rating
                    if (myQuestionList[i].rating_list && angular.isArray(myQuestionList[i].rating_list) && myQuestionList[i].rating_list.length > 0) {
                        var total = 0;
                        var count = 0;
                        for (var j in myQuestionList[i].rating_list) {
                            var rating = myQuestionList[i].rating_list[j];
                            if (rating && rating.rating_value && angular.isNumber(rating.rating_value)) {
                                if (rating.rating_value >= 0 && rating.rating_value <= 5) {
                                    total += rating.rating_value;
                                    count++;
                                }
                            }
                        }

                        if (count > 0) {
                            total /= count;
                        }
                        myQuestionList[i].avgRating = total;
                    } else {
                        // set for sorting
                        myQuestionList[i].avgRating = -1;
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

            return questionList;
        }
    }

})();
