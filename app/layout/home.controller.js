(function() {
    'use strict';

    angular.module('app.layout')
           .controller('homeController', homeController);

    homeController.$inject = [
        'authService',
        '$rootScope',
        '$filter',
        '$state',
        'frontPageDoctorSlideList',
        'doctorCount',
        'askDoctorCategoryNameTextList',
        'askdoctorQuestionService'
    ];

    function homeController(
        authService,
        $rootScope,
        $filter,
        $state,
        frontPageDoctorSlideList,
        doctorCount,
        askDoctorCategoryNameTextList,
        askdoctorQuestionService) {

        var QUESTION_LEN_MIN = 10;
        var DATE_FORMAT = 'yyyy-MM-ddTHH:mmZ';

        var vm = this;

        vm.frontPageDoctorSlideList = frontPageDoctorSlideList;

        vm.doctorCount = doctorCount || 0;

        vm.showInstruction = false;

        vm.askdoctorCategoryList = askDoctorCategoryNameTextList;
        addInstructionOption(vm.askdoctorCategoryList);
        vm.selectedCategory = '';
        vm.questionLengthMin = QUESTION_LEN_MIN;

        vm.askQuestion = askQuestion;
        vm.questionSubmitted = false;
        vm.statusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };
        // FIXME remove this if the instruction text is not needed
        /*vm.enterDoctorListLink = enterDoctorListLink;
        vm.leaveDoctorListLink = leaveDoctorListLink;*/


        /* public functions */
        /*function enterDoctorListLink() {
            vm.showInstruction = true;
        }

        function leaveDoctorListLink() {
            vm.showInstruction = false;
        }*/

        function askQuestion() {
            vm.questionSubmitted = true;
            vm.statusMessage.isShown = false;

            // invalid question text
            if (vm.questionForm.questionText.$invalid) {
                return;
            }

            if (!askdoctorQuestionService || !$rootScope || !$rootScope.authenticated ||
                !$rootScope.account || !$rootScope.account.account_id) {
                askQuestionFailed('提問時發生錯誤，請稍後重試');
                return;
            }

            if (vm.selectedCategory === '') {
                askQuestionFailed('請選擇一個問題類別');
                return;
            }

            // TODO change these
            var questionBody = {
                questioner_id : $rootScope.account.account_id,
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

        /* private functions */

        function addInstructionOption(categoryList) {
            var isExist = false;

            for (var i in categoryList) {
                if (!categoryList[i]) {
                    continue;
                }

                if (categoryList[i].name === '') {
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                var category = {
                    name : '',
                    text : '請選擇問題類別'
                };
                categoryList.unshift(category);
            }
        }

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

            if (!question || !question.category) {
                return;
            }

            // change state to askdoctor list
            $state.go('askdoctor.list', { category : question.category });
        }
    }

})();